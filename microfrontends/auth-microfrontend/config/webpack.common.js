const webpack = require("webpack");

module.exports = {
	resolve: {
		extensions: [".js", ".jsx", ".ts", ".tsx"],
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: "ts-loader",
				exclude: /node_modules/,
			},
			{
				test: /\.jsx?$/,
				loader: "babel-loader",
				exclude: /node_modules/,
				options: {
					presets: ["@babel/preset-react", "@babel/preset-typescript"],
				},
			},
			{
				test: /\.css$/,
				use: [
					"style-loader",
					"css-loader",
					{
						loader: "postcss-loader",
						options: {
							postcssOptions: {
								plugins: [require("tailwindcss"), require("autoprefixer")],
							},
						},
					},
				],
			},
		],
	},
	plugins: [
		new webpack.DefinePlugin({
			"process.env.REACT_APP_API_URL": JSON.stringify(
				process.env.REACT_APP_API_URL || "http://localhost:4000"
			),
		}),
	],
};
