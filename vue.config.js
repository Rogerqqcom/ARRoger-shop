module.exports = {
  publicPath: './',//配置根目录，上传访问目的的时候用到，比如www.sina.com/china/,这个/china/就是要额外配置的，写成publicPath:'/china/'
  // publicPath: '/',//配置根目录，开发时用到
  assetsDir: 'static', //静态资源目录（js,css,image）
  lintOnSave:false,//是否开启eslint检测,false不开启，有效值：true || false
  productionSourceMap:false,//生成环境下面开启sourceMap支持断点调试
  configureWebpack: {
      resolve: {
          alias: {
              'assets': '@/assets',
              'common': '@/common',
              'components': '@/components',
              'network': '@/network',
              'views': '@/views'
          }
      }
  },
/*  devServer: {
    // 启动项目设置的端口
    port: 8083,
    //配置跨域代理
    proxy: {
      '/api': {
        target:'http://localhost:3000',
        changeOrigin: true, //开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
        pathRewrite: {
            '^/api': '' //这里理解成用'/api'代替target里面的地址,比如我要调用'http://40.00.100.100:3002/user/add'，直接写'/api/user/add'即可
          }
      },
    },
  }*/

}
