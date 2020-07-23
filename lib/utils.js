module.exports = {
  // 查询字符串
  urlStringify: (query = {}) => {
    return Object.keys(query).reduce((pre, key) => {
      let val = query[key] || "";
      const join = pre ? "&" : "";
      if (Array.isArray(val)) {
        val = val.join(",");
      } else if (typeof val === "object") {
        val = JSON.stringify(val);
      } else {
        val = String(val);
      }
      return `${pre}${join}${key}=${val}`;
    }, "");
  }
}