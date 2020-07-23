const { urlStringify } = require('./utils')

const ReportPlugin = ({ types: t }) => {
  // 解析ArrayExpression表达式的值
  const getArrayValue = (elements = []) => {
    const values = [];
    elements.forEach((ele) => {
      // 这里只处理["1", '2']字符串类型，如需扩展更多可继续判断写
      if (t.isStringLiteral(ele)) values.push(ele.value);
    });
    return values;
  };

  // 获取属性下对应key-value
  const parseKeyValue = (properties = []) => {
    const props = {};
    properties.forEach((prop) => {
      if (t.isObjectProperty(prop)) {
        const key = prop.key.name;
        let valueNode = prop.value;
        let value = "";
        if (t.isStringLiteral(valueNode)) value = valueNode.value;
        if (t.isArrayExpression(valueNode))
          value = getArrayValue(valueNode.elements);
        if (t.isObjectExpression(valueNode))
          value = parseKeyValue(valueNode.properties);
        return (props[key] = value);
      }
    });
    return props;
  };

  const visitor = {
    JSXAttribute(path) {
      const { name, value } = path.node;
      if (
        !(
          t.isJSXIdentifier(name, { name: "spmReport" }) &&
          t.isJSXExpressionContainer(value) &&
          t.isObjectExpression(value.expression)
        )
      )
        return;

      const { properties } = value.expression;

      // 解析出来的Object值
      const { spmCode = "", locaid = "", ...others } = parseKeyValue(properties);
      
      const otherStr = urlStringify(others) || "";

      // 生成属性名称
      const attrName = t.JSXIdentifier("data-spm-click");
      // 生成属性值
      const attrValue = t.stringLiteral(
        `gostr=/${spmCode};locaid=d${locaid};${otherStr}`
      );
      // 生成新的属性节点
      const newAttr = t.jSXAttribute(attrName, attrValue);

      // 替换当前属性节点为最新生成属性节点
      path.replaceWith(newAttr);
    },
  };

  return { visitor };
};

module.exports = ReportPlugin;
