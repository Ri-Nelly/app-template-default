const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env, args) => {
    const { mode = 'development' } = args;
    const isDev = mode === 'development';

    return {
        entry: './src/index.tsx',
        output: {
            filename: 'index.js',
            path: path.resolve(__dirname, 'build'),
            clean: true
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
                {
                    test: /\.s[ac]ss$/i,

                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                        },
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true,
                                modules: {
                                    mode: 'local'
                                },
                            },
                        },
                        "sass-loader",
                    ]
                },

            ],
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js', '.scss'],
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: 'styles.css'
            }),
            new HtmlWebpackPlugin({
                template: './public/index.html',
                minify: false,
            })
        ],
        devServer: {
            static: {
                directory: path.join(__dirname, 'build'),
            },
            compress: true,
            port: 9000,
            hot: false
        },
        optimization: {
            minimizer: [
                new TerserPlugin({
                    parallel: true
                }),
            ],
        }
    }
}
