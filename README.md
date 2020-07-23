# babel-plugin-spmreport

`babel-plugin-spmreport` 可视化页面埋点插件，在节点以对象配置方式插入节点属性，通过babel插件解析后，形成特殊固定属性字符串。

# Installation
```
tnpm install --save-dev babel-plugin-spmreport
```
# example
原始写法
```
<a
  data-spm-click="gostr=/alscadbss.ka_panel.page_click;locaid=dspmd;bizType=7&modeType=3"
>
  埋点上报
</a>
```

插件写法
```
// spmcode为黄金令牌串，locaid为D位和其他的属性
<a
  spmReport={{
    spmCode: "alscadbss.ka_panel.page_click",
    locaid: "spmd",
    bizType: "7",
    modeType: "3",
  }}
>
  埋点上报
</a>
```

# 插件引入
```
module.exports = {
  plugins: [
    'babel-plugin-spmreport'
  ]
}
```

## License

MIT
