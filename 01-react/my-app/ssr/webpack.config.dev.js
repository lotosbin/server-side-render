import webpack from 'webpack'
import config from '../config/webpack.config.dev'

const QUERY = {
    name: '[name].[hash].[ext]'
};

export default {
    ...config,
    module: {
        ...config.module,
        rules: [
            ...config.module.rules,
            {
                test: /\.svg$/,
                loader: 'svg-inline-loader'
            }
        ]
    },
    plugins: [
        ...config.plugins,
        new webpack.ProvidePlugin({
            "React": "react",
        })
    ],
    externals: {
        'react': 'React'
    }
}