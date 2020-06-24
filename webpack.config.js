const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

let isDev = Boolean(process.env.WEBPACK_DEV_SERVER)

module.exports = {
	entry: './src/javascript/index.js',
	output: {
		filename: './script/bundle.js',
		path: path.resolve(__dirname, 'dist')
	},
	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		open: true,
		compress: true,
		stats: 'errors-only'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env']
					}
				}
			},
			{
				test: /\.(sa|sc|c)ss$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							publicPath: '../'
						}
					},
					'css-loader',
					'postcss-loader',
					'sass-loader'
				]
			},
			{
				test: /\.(jpg|png|svg|webp)$/,
				loader: 'file-loader',
				options: {
					options: {
						name: '[name].[ext]',
						outputPath: 'images',
						publicPath: ''
					}
				}
			},
			{
				test: /\.(gltf|glb)$/,
				use: [
					{
						loader: "gltf-webpack-loader"
					}
				]
			},
			{
				test: /\.(eot|otf|ttf|woff|woff2|svg)$/,
				loader: 'file-loader',
				options: {
					name: '[name].[ext]',
					outputPath: 'font'
				}
			},
			{
				test: /\.ejs$/,
				use: ['ejs-loader']
			}
		]
	},
	plugins: [
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin({
			filename: './style/style.css'
		}),
		new CopyPlugin({
			patterns: [
				{ from: 'images/**', to: path.resolve(__dirname, 'dist') }
			]
		}),
		new HtmlWebpackPlugin({
			title: 'Homepage',
			template: './src/index.ejs',
			minify: isDev ? false : {
				collapseWhitespace: true,
				removeComments: true,
				removeRedundantAttributes: true,
				removeScriptTypeAttributes: true,
				removeStyleLinkTypeAttributes: true,
				useShortDoctype: true
			}
		}),
		...['index', 'choix-infographiste'].map(el => {
			return new HtmlWebpackPlugin({
				template: `./src/dashboard/${el}.ejs`,
				filename: `dashboard/${el}.html`,
				minify: isDev ? false : {
					collapseWhitespace: true,
					removeComments: true,
					removeRedundantAttributes: true,
					removeScriptTypeAttributes: true,
					removeStyleLinkTypeAttributes: true,
					useShortDoctype: true
				}
			})
		}),
		...['connexion'].map(el => {
			return new HtmlWebpackPlugin({
				template: `./src/auth/${el}.ejs`,
				filename: `auth/${el}.html`,
				minify: isDev ? false : {
					collapseWhitespace: true,
					removeComments: true,
					removeRedundantAttributes: true,
					removeScriptTypeAttributes: true,
					removeStyleLinkTypeAttributes: true,
					useShortDoctype: true
				}
			})
		})
	]
}
