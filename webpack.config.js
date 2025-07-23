const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new Dotenv({
      systemvars: true,
    }),
  ],
  // 添加完整的 devServer 配置
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: 9000,
    historyApiFallback: true,
    open: true, // 自动打开浏览器
    hot: true,  // 启用热模块替换
    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
      progress: true,
    },
  },
};