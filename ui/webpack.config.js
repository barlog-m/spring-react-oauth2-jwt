const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const vendorList = require("./vendor")();

const config = {
	context: path.join(__dirname, "src"),
	entry: {
		bundle: (process.env.NODE_ENV === "development") ? "./index.dev.js" : "./index.js",
		vendor: vendorList,
	},
	output: {
		path: path.join(__dirname, "dist"),
		filename: "js/bundle.js",
		publicPath: "/"
	},

	devtool: "cheap-module-eval-source-map",

	plugins: [
		new webpack.DefinePlugin({
			"process.env": {
				NODE_ENV: JSON.stringify(process.env.NODE_ENV),
				MOCK: process.env.MOCK ? JSON.parse(process.env.MOCK) : false
			}
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: "vendor",
		    filename: "js/vendor.js"
		}),
		new ExtractTextPlugin({
			filename: "css/[name].css",
			disable: false,
			allChunks: true
		}),
		new HtmlWebpackPlugin({
			template: "index.html"
		}),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin()
	],

	module: {
		rules: [
			{
				test: /\.js$/,
				loader: "babel-loader",
				exclude: /node_modules/
			},
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract(["css-loader"])
			},
			{
				test: /\.(jpg|jpeg|gif|png|svg)$/,
				loader: "url-loader",
				options: {
					limit: 1024,
					name: "images/[name].[ext]?[hash]"
				}
			},
			{
				test: /\.(woff|woff2|eot|ttf)$/,
				loader: "url-loader",
				options: {
					limit: 1024,
					name: "fonts/[name].[ext]?[hash]"
				}
			}
		]
	},
	devServer: {
		port: 8080,
		disableHostCheck: true,

		historyApiFallback: true,
		hot: true,

		proxy: {
			"/api/": {
				target: "http://localhost:8081/api",
				secure: false,
				prependPath: false
			},
			"/oauth/": {
				target: "http://localhost:8081/oauth",
				secure: false,
				prependPath: false
			}
		}
	}
};

if (process.env.NODE_ENV === "production") {
	config.plugins = [
		new webpack.DefinePlugin({
			"process.env": {
				NODE_ENV: JSON.stringify(process.env.NODE_ENV)
			}
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: "vendor",
			filename: "js/[hash].vendor.js"
		}),
		new ExtractTextPlugin({
			filename: "css/[hash].[name].css",
			disable: false,
			allChunks: true
		}),
		new HtmlWebpackPlugin({
			template: "index.html",
			hash: true,
			minify: {
				removeComments: true,
				collapseWhitespace: true
			}
		}),
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.optimize.UglifyJsPlugin({
			sourceMap: true,
			minimize: true,
			compress: {
				pure_funcs: [ "console.debug" ],
				warnings: false
			}
		}),
		new webpack.NoEmitOnErrorsPlugin()
	];

	config.output.path = path.join(__dirname, "dist");
	config.output.publicPath = "/ui/";
	config.output.filename = "js/[hash].bundle.js";
	config.devtool = "source-map";
}

module.exports = config;
