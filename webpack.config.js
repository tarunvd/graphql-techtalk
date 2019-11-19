var HtmlWebpackPlugin = require("html-webpack-plugin");
var path = require("path");

let tslintOptions = {};

if (process.env.NODE_ENV === "production") {
    tslintOptions.failOnHint = true;
}

module.exports = {
    entry: "./src/app/index.tsx",
    output: {
        path: path.resolve(__dirname, "./public"),
        filename: "bundle.js"
    },
    resolve: {
      // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: [ ".ts", ".tsx", ".js" ]
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "tslint-loader",
                enforce: "pre",
                options: tslintOptions
            },
            // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
            {
                test: /\.tsx?$/,
                loader: "ts-loader"
            }

        ]
    },
    devtool: "source-map",
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "src/app/index.html")
        })
    ],
    devServer: {
        contentBase: path.join(__dirname, "public"),
        compress: true,
        port: 5001,
        historyApiFallback: true
    }
};