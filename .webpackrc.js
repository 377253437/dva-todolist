const path = require('path');

export default {
  alias: {
    '@': path.resolve('src'),
  },
  extraBabelPlugins: [
    [
      'import',
      {
        libraryName: "antd",
        libraryDirectory: "es",
        style: "css"
      }
    ]
  ]
}
