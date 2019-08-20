const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
	// mode: 'production',
	entry: "./src/script.js",
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundler.js'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
			},
			{
				test: /\.css$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader'],
				// use: [
				//   {
				// 	loader: MiniCssExtractPlugin.loader,
				// 	options: {
				// 	  // you can specify a publicPath here
				// 	  // by default it uses publicPath in webpackOptions.output
				// 	  publicPath: '../',
				// 	},
				//   },
				//   'css-loader',
				// ],
			},
            // {
			// 	test: /\.css$/,
			// 	exclude: /node_modules/,
			// 	loader: 'style-loader!css-loader'
			// 	loader: 'style-loader!css-loader!sass-loader'
			// },
			{
				test: /\.(png|jp(e*)g|svg)$/,
				exclude: /node_modules/,
				use: [{
					loader: 'url-loader',
					options: { 
						limit: 8000, // Convert images < 8kb to base64 strings
						// name: 'img/[hash]-[name].[ext]'
						name: 'img/[name].[ext]'
					} 
				}]
			}
		]
	},
	plugins: [
		new MiniCssExtractPlugin({
		  filename: '[name].css',
		  chunkFilename: '[id].css',
		//   ignoreOrder: false,
		}),
	],
	optimization: {
		minimizer: [
			new TerserPlugin({ test: /\.js(\?.*)?$/i, exclude: /\/node_modules/}),
			new OptimizeCSSAssetsPlugin({ exclude: /\/node_modules/ })
		]
	},
};