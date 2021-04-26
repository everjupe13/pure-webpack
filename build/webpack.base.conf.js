const path = require('path');
const fs = require('fs');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');


const PATHS = {  // Main const
    src: path.join(__dirname, '../src'),
    dist: path.join(__dirname, '../dist'),
    assets: 'assets/'
}

const PAGES_DIR = PATHS.src  // Pages const for HtmlWebpackPlugin


module.exports = {
    externals: {
        paths: PATHS
    },
    entry: {
        main: PATHS.src,

        // hanzi: `${PATHS.src}/hanzi.index.js`,
        // bidi: `${PATHS.src}/bidi.index.js`,

    },
    output: {
        filename: `${PATHS.assets}js/[name].[contenthash].js`,
        path: PATHS.dist,

        publicPath: '/' // absolute path from root server
        // publicPath: './' // relative path about document
        
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    name: 'vendors',
                    test: /node_modules/,
                    chunks: 'all',
                    enforce: true
                }
            }
        }
    },
    module: {
        rules: [
            {   // JavaScript
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: '/node_modules/'
            },
            {   // Vue
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loader: {
                        scss: 'vue-style-loader!css-loader!sass-loader'
                    }
                }
            },
            {   // Pug
                test: /\.pug$/,
                loader: 'pug-loader'
            },
            {   // Fonts
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]'
                }
            },
            {   // images / icons
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]'
                }
            },
            {   // scss
                test: /\.scss$/,
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: { sourceMap: true, url: false }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                            config: { path: `./postcss.config.js` }
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: { sourceMap: true }
                    }
                ]
            },
            {   // css
                test: /\.css$/,
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: { sourceMap: true, url: false }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                            config: { path: `./postcss.config.js` }
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        alias: {
            '~': PATHS.src, // Example: import Dog from "~/assets/img/dog.jpg"
            '@': `${PATHS.src}/js`, // Example: import Sort from "@/utils/sort.js"
            vue$: 'vue/dist/vue.js'
        }
    },
    plugins: [
        new VueLoaderPlugin(),  // Vue loader
        new MiniCssExtractPlugin({
            filename: `${PATHS.assets}css/[name].[contenthash].css`
        }),
        new CopyWebpackPlugin({
            patterns: [
                {   // Images:
                    from: `${PATHS.src}/${PATHS.assets}img`,
                    to: `${PATHS.assets}img`,
                    noErrorOnMissing: true,
                },
                {   // Fonts:
                    from: `${PATHS.src}/${PATHS.assets}fonts`,
                    to: `${PATHS.assets}fonts`,
                    noErrorOnMissing: true,
                },
                {   // Static (copy to '/'):
                    from: `${PATHS.src}/static`,
                    to: ''
                }
            ]
        }),
        new HtmlWebpackPlugin({
            template: `${PAGES_DIR}/index.html`,
            filename: './index.html',
            minify: {
                collapseWhitespace: true,
                removeComments: true,
            },
            chunks: ['main'],
        }),
        // new HtmlWebpackPlugin({
        //     template: `${PAGES_DIR}/hanzi.html`,
        //     filename: './hanzi.html',
        //     minify: {
        //         collapseWhitespace: true,
        //         removeComments: true,
        //     },
        //     chunks: ['main', 'hanzi'],
        // }),
        // new HtmlWebpackPlugin({
        //     template: `${PAGES_DIR}/baidi.html`,
        //     filename: './baidi.html',
        //     minify: {
        //         collapseWhitespace: true,
        //         removeComments: true,
        //     },
        //     chunks: ['main', 'baidi'],
        // }),
    ]
}
