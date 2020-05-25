const path = require ("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require ("clean-webpack-plugin");

module.exports = {
    mode: "development",
    devtool: "none",
    entry: "./src/index.js",
    output: {
        filename: "main.[contentHash].js",
        path: path.resolve(_dirname, "dist")
    },
    plugins: [new HtmlWebpackPlugin({
        template: "./views/layouts/main.handlebars"
    })],
    plugins: [new CleanWebpackPlugin()], 
    module: {
        rules: [
           {
               test: /\.scss$/,
               use: ["style-loader", "css-loader", "sass-loader"]
           }, 
           {
               test: /\.handlebars$/,
               use: ["html-loader"]
           },
           {
            test: /\.(svg|png|jpg|gif)$/,
            use: {
                loader: "file-loader",
                options: {
                    name: "[name].[hash].[ext]",
                    outputPath: "imgs",
                }
            }
            }
        ] 
    }
};




//@ts-check

'use strict';

/**@type {import('webpack').Configuration}*/
const config = {
    target: 'node', // vscode extensions run in a Node.js-context 📖 -> https://webpack.js.org/configuration/node/

    entry: './src/extension.ts', // the entry point of this extension, 📖 -> https://webpack.js.org/configuration/entry-context/
    output: {
        // the bundle is stored in the 'dist' folder (check package.json), 📖 -> https://webpack.js.org/configuration/output/
        path: path.resolve(__dirname, 'dist'),
        filename: 'extension.js',
        libraryTarget: 'commonjs2',
        devtoolModuleFilenameTemplate: '../[resource-path]'
    },
    devtool: 'source-map',
    externals: {
        vscode: 'commonjs vscode' // the vscode-module is created on-the-fly and must be excluded. Add other modules that cannot be webpack'ed, 📖 -> https://webpack.js.org/configuration/externals/
    },
    resolve: {
        // support reading TypeScript and JavaScript files, 📖 -> https://github.com/TypeStrong/ts-loader
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'ts-loader'
                    }
                ]
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    'style-loader',
                    // Translates CSS into CommonJS
                    'css-loader',
                    // Compiles Sass to CSS
                    'sass-loader',
                ]
            },
        ],
    },
};

module.exports = config;