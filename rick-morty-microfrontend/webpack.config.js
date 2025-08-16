const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

module.exports = {
  mode: 'development',
  devServer: {
    port: 3002,
    allowedHosts: ['localhost', '127.0.0.1'],
    headers: {
      'Access-Control-Allow-Origin': 'http://localhost:3000 http://localhost:3001 http://localhost:3002 http://localhost:3003',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
      'Access-Control-Allow-Credentials': 'true',
    },
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-react', '@babel/preset-typescript'],
        },
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  require('tailwindcss'),
                  require('autoprefixer'),
                ],
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'rickmorty',
      filename: 'remoteEntry.js',
      remotes: {
        sharedComponents: 'sharedComponents@http://localhost:3003/remoteEntry.js',
      },
      exposes: {
        './RickMortyApp': './src/RickMortyApp',
      },
      shared: {
        react: { 
          singleton: true,
          requiredVersion: '^18.2.0',
          eager: false
        },
        'react-dom': { 
          singleton: true,
          requiredVersion: '^18.2.0',
          eager: false
        },
        'react-router-dom': { 
          singleton: true,
          requiredVersion: '^6.8.0',
          eager: false
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};
