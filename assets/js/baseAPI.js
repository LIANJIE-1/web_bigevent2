//设置路径(测试)
var baseURL = 'http://ajax.frontend.itheima.net'
    //设置路径(生产)
    // var baseURL = 'htp://www.itcast.cn'

$.ajaxPrefilter(function(options) {
    console.log(options);
    options.url = baseURL + options.url
})