// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

// const target = 'http://101.37.147.46:99';
//const target = 'https://wx.asdaimeiye.com';
const target = 'http://192.168.1.198:99';

module.exports = {
    build: {
        env: require('./prod.env'),
        index: path.resolve(__dirname, '../dev/index.html'),
        assetsRoot: path.resolve(__dirname, '../dev'),
        assetsSubDirectory: 'static',
        assetsPublicPath: './',
        productionSourceMap: false,
        // Gzip off by default as many popular static hosts such as
        // Surge or Netlify already gzip all static assets for you.
        // Before setting to `true`, make sure to:
        // npm install --save-dev compression-webpack-plugin
        productionGzip: false,
        productionGzipExtensions: ['js', 'css'],
        // Run the build command with an extra argument to
        // View the bundle analyzer report after build finishes:
        // `npm run build --report`
        // Set to `true` or `false` to always turn it on or off
        bundleAnalyzerReport: process.env.npm_config_report
    },
    dev: {
        env: require('./dev.env'),
        port: 8080,
        //是否自动打开浏览器
        autoOpenBrowser: false,
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        proxyTable: {
            '/webtest': {
                target,
                changeOrigin: true
            },
            '/hairdo': {
                target,
                changeOrigin: true
            },
            '/label': {
                target,
                changeOrigin: true
            },
            '/picUpload': {
                target,
                changeOrigin: true
            },
            '/edition': {
                target,
                changeOrigin: true
            },
            '/device': {
                target,
                changeOrigin: true
            },
            '/cloth': {
                target,
                changeOrigin: true
            },
            '/collocat': {
                target,
                changeOrigin: true
            },
            '/face': {
                target,
                changeOrigin: true
            },
            '/device': {
                target,
                changeOrigin: true
            },
            '/job': {
                target,
                changeOrigin: true
            },
            '/employee': {
                target,
                changeOrigin: true
            },
            '/power': {
                target,
                changeOrigin: true
            },
            '/dept': {
                target,
                changeOrigin: true
            },
            '/user': {
                target,
                changeOrigin: true
            },
            '/FileDownload': {
                target,
                changeOrigin: true
            },
            '/operation': {
                target,
                changeOrigin: true
            },
            '/wxuser': {
                target,
                changeOrigin: true
            },
            '/pc': {
                target,
                changeOrigin: true
            },
            '/advert': {
                target,
                changeOrigin: true
            },
            '/excel': {
                target,
                changeOrigin: true
            },
        },
        // CSS Sourcemaps off by default because relative paths are "buggy"
        // with this option, according to the CSS-Loader README
        // (https://github.com/webpack/css-loader#sourcemaps)
        // In our experience, they generally work as expected,
        // just be aware of this issue when enabling this option.
        cssSourceMap: false
    }
}