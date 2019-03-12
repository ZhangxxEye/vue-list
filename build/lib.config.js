'use strict';
const path = require('path');
const CleanPlugin = require('clean-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const mode = process.env.NODE_ENV === 'development' ? 'development' : 'production';

const resolve = src => path.resolve(__dirname, src);

module.exports = {
    mode: 'production',
    entry: [resolve('../index.js')],
    output: {
        path: resolve('../dist'),
        publicPath: '/dist/',
        filename: 'index.js',
        library: 'vueTabs',
        libraryTarget: 'umd',
    },
    externals: {
        vue: 'vue',
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        plugins: ['@babel/plugin-proposal-object-rest-spread'],
                        presets: ['@babel/preset-env']
                    },
                },
            },
            {
                test: /\.(scss|css)$/,
                use: [
                    'vue-style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            sourceMap: true,
                        },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [
                                require('autoprefixer')(),
                            ],
                            sourceMap: true,
                        },
                    },
                    'sass-loader',
                ],
            },
            {
                test: /\.less$/,
                exclude: /\.demo\./,
                use: [
                    'vue-style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            sourceMap: true,
                        },
                    },
                    {
                        loader: 'less-loader',
                    }
                ],
            },
            {
                test: /\.(ttf|eot|woff|woff2|otf)$/,
                loader: 'url-loader',
                options: {
                    limit: 100000,
                },
            },
            {
                test: /\.(gif|png|jpe?g|svg|webp)$/i,
                use: [
                    'file-loader',
                    {
                        loader: 'image-webpack-loader',
                        options: mode === 'production' ? {
                            mozjpeg: {
                                progressive: true,
                                quality: 75,
                            },
                            optipng: {
                                enabled: false,
                            },
                            pngquant: {
                                quality: '75-90',
                                speed: 4,
                            },
                        } : {disable: true},
                    },
                ],
            },
        ],
    },
    plugins: [
        new VueLoaderPlugin(),
        new CleanPlugin(['../dist'], {allowExternal: true}),
    ],
    resolve: {
        extensions: ['.js', '.vue'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
        },
    },
    devtool: '#source-map',
    optimization: {
        minimize: true,
    },
};
