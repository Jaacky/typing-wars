const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");
// const postcssModulesValues = require('postcss-modules-values');

module.exports = {
    output: {
        publicPath: '/',
    },
    resolve: {
        modules: ['node_modules', 'src'],
        extensions: ['.css', '.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                            modules: true,
                            importLoaders: 1,
                            localIdentName: '[name]___[local]___[hash:base64:5]'
                        }
                    }
                ]
            },
            // {
            //     test: /\.(eot|svg|ttf|woff|woff2)$/,
            //     loader: 'file?name=[name].[ext]'
            // },
            {
                test: /\.(woff(2)?|ttf|eot|svg|otf)(\?v=\d+\.\d+\.\d+)?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'fonts/'
                    }
                }]
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader",
                        options: { minimize: true }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/index.html"
        })
    ]
};