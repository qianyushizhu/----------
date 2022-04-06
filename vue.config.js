// config配置
const CompressionWebpackPlugin = require("compression-webpack-plugin");
const productionGzipExtensions = ["js", "css"];
module.exports = {
  lintOnSave: false,
  devServer: {
    overlay: {
      warning: false,
      errors: false,
    },
  },
  configureWebpack: (config) => {
    // 生产环境下使用gzip
    if (process.env.NODE_ENV === "prod") {
      // 增加浏览器CPU（需要解压缩）， 减少网络传输量和带宽消耗 （需要衡量，一般小文件不需要压缩的）
      // 图片和PDF文件不应该被压缩，因为他们已经是压缩的了，试着压缩他们会浪费CPU资源而且可能潜在增加文件大小。
      config.plugins.push(
        new CompressionWebpackPlugin({
          test: /\.(js|css|svg|woff|ttf|json|html)$/,
          // 大于10kb的会压缩
          threshold: 10240,
        })
      );
    }
  },
};
