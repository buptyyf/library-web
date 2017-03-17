module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: 'bundle.js',
        path: __dirname + '/built/js'
    },
    module: {
        rules: [
            {
                test: /\.js[x]?$/, 
                exclude: /node_modules/, 
                loader: "babel-loader",
                options: {
                    "presets": [
                        ["es2015", { "modules": false }],
                        "react"
                    ]
                }
            },
            {
                test: /\.less$/, 
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        // options: {
                        //     modules: true,
                        //     localIdentName: '[path][name]__[local]--[hash:base64:5]',
                        //     sourceMap: true
                        // }
                    },
                    "less-loader"
                ]
            }
        ]
    }
}
