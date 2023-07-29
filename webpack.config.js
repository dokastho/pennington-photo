const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    account: './pennington_photo/js/account.jsx',
    delete: './pennington_photo/js/delete.jsx',
    create: './pennington_photo/js/create.jsx',
    index: './pennington_photo/js/index.jsx',
    login: './pennington_photo/js/login.jsx',
    password: './pennington_photo/js/password.jsx',
  },
  output: {
    path: path.join(__dirname, '/pennington_photo/static/js/'),
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
        // Test for js or jsx files
        test: /\.jsx?$/,
        // Exclude external modules from loader tests
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
          plugins: ['@babel/transform-runtime'],
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
