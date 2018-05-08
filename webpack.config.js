const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');

var config = {
    output: {
        path: path.resolve(__dirname + '/dist/'),
    },
    externals: {
        VueScrollTo: 'vue-scrollto'
    },
    module: {
    loaders: [{
        test: /\.js$/,
        loader: 'babel',
        include: __dirname,
        exclude: /node_modules/
    },
    {
        test: /\.vue$/,
        loader: 'vue'
    },
    {
        test: /\.css$/,
        loader: 'style!scss!css'
    }
    ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            sourceMap: false,
            mangle: true,
            compress: {
            warnings: false
            }
        })
    ]
};

module.exports = [
    merge(config, {
        entry: path.resolve(__dirname + '/src/plugin.js'),
        output: {
          filename: 'vue-conversational-form.min.js',
          libraryTarget: 'window',
          library: 'ConversationalForm',    
        }
    }),
    merge(commonConfig, {
        entry: path.resolve(__dirname + '/src/components/ConversationalForm.vue'),
        output: {
          filename: 'vue-conversational-form.js',
          libraryTarget: 'umd',
          library: 'ConversationalForm',
          umdNamedDefine: true
        }
    })
];