$(function() {
    //1.获取用户信息
    getUserInfo()

    // 3.退出登录
    $('#btnLogout').on('click', function() {
        // 3.1提示
        layer.confirm('是否确认退出?', { icon: 3, title: '提示' }, function(index) {
            //do something
            // 3.2删除本地token
            localStorage.removeItem('token')

            location.href = '/login.html'

            layer.close(index);
        });
    })
})

//获取用户信息封装
function getUserInfo() {
    $.ajax({
        method: 'get',
        url: '/my/userinfo',
        //在jq中的ajax,专门用户设置请求求信息的属性
        // headers: {
        //     Authorization: localStorage.getItem('token')
        // },
        success: function(res) {
            // console.log(res);
            if (res.status != 0) {
                return layui.layer.msg(res.message)
            }
            // 2.调用用户渲染函数
            renderUser(res.data)
        }
    })

}

//2.封装用户渲染函数
function renderUser(user) {
    //1.渲染用户名
    var uname = user.nickname || user.username
    $('#welcome').html("欢迎&nbsp;&nbsp;" + uname);
    //2.渲染用户头像
    //判断,用户头像信息,如果有就渲染图片,如果没有就渲染文字
    if (user.user_pic != null) {
        $('.layui-nav-img').show().attr('src', user.user_pic)
        $('.text-avater').hide()
    } else {
        $('.layui-nav-img').hide()
        $('.text-avater').show().html(uname[0].toUpperCase())
    }
}