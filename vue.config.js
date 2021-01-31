module.exports = {
    lintOnSave: false,
    devServer: {
        proxy: {
            '^/api': {
                target: process.env.VUE_APP_ROOT_URL,
                changeOrigin: true,
            }
        }
    },
    outputDir: '../../public',
    indexPath: '../resources/views/index.blade.php'
}
