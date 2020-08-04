$(function() {
    //1.定义校验规则
    var form = layui.form
    form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return '昵称应该输入 1~6 位'
            }
        }
    });
    // 2.初始化用户信息
    initUserInfo()

    function initUserInfo() {
        // 2.发送ajaxj
        $.ajax({
            method: 'get',
            url: '/my/userinfo',
            success: function(res) {
                if (res.status != 0) {
                    return layer.msg(res.message)
                }
                // console.log(res);
                //展示用户信息
                form.val('formUserInfo', res.data)
            }
        });
    }


    // 3.重置(只接受click事件绑定)
    $('#btnReset').on('click', function(e) {
        e.preventDefault();
        //展示用户信息
        initUserInfo()
    })


    // 4.提交修改信息
    $('.layui-form').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'post',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status != 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message);
                //刷新父框架里面的用户信息
                window.parent.getUserInfo()
            }
        })
    })

})