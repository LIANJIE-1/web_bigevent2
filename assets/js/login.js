// 入口函数
$(function() {
    //1.点击按钮,切换登录和注册部分页面
    $("#link_reg").on('click', function() {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    $("#link_login").on('click', function() {
        $('.login-box').show()
        $('.reg-box').hide()
    });

    // 2.定义layui表单校验规则
    var form = layui.form;
    //利用form这个对象,创建规则
    form.verify({
        //属性的值可以是数组,也可以是函数
        pwd: [/^\S{6,12}$/, '密码为6~12位,不能包含空格!'],
        repwd: function(value) {
            if ($('#reg-pwd').val() != value) return '两次密码输入不一致!'
        }
    })

    // 3.注册功能
    var layer = layui.layer;
    $('#form_reg').on('submit', function(e) {
        //阻止表单默认提交
        e.preventDefault()
        $.ajax({
            method: 'post',
            url: '/api/reguser',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status != 0) return layer.msg(res.message);
                // 注册成功,提示
                layer.msg(res.message);
                //触动到切换到登录的a链接的点击行为
                $('#link_login').click();
                //清空表单
                $('#form_reg')[0].reset()
            }

        })
    })


    // 4.登录
    $('#form_login').on('submit', function(e) {
        // 阻止默认行为
        e.preventDefault()
        $.ajax({
            method: 'post',
            url: '/api/login',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status != 0) return layer.msg(res.message);
                //注册成功,提示
                console.log(1);
                layer.msg(res.message);
                //保存token
                localStorage.setItem('token', res.token);
                //页面跳转
                location.href = '/index.html'
            }
        })
    })
})