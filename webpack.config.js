module.exports = {
    entry: './src/app/index.js',
    output: {
        path: __dirname + '/src/public',
        filename: 'bundle.js',
        publicPath: '/src/public'
    },
    module:{
        rules:[
            {
                use: 'babel-loader',
                test: /\.js$/,
                exclude: /node_modules/
            },
            {
                test:/\.css$/,
                use: [
                { loader: "style-loader" },
                { loader: "css-loader" }
                ]
            }
        ]
    },
    devServer: {
        contentBase:'app/ui/www',
        devtool:'eval',
        hot:true,
        inline:true,
        port:3000,
        
        historyApiFallback: true,
    }
}