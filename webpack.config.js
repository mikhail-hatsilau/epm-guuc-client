const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/app',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    babelrc: true
                }
            },
            {
                test: /\.module.scss$/,
                exclude: /node_modules/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true
                        }
                    },
                    'sass-loader'
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'template.html'
        })
    ],
    resolve: {
        extensions: ['.js', '.json', '.jsx', '.scss']
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        port: 9200,
        proxy: {
            "**": "http://localhost:3000"
        }
    }
};
