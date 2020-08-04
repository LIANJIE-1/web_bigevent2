$(function() {
    var form = layui.form
    form.verify({
        //密码长度
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        //新密码不能与旧密码相同
        samePwd: function(value) {
            if (value === $('[name=oldPwd]').val())
                return '新密码不能与原密码相同';
        },
        //密码二次验证
        rePwd: function(value) {
            if (value !== $('[name=newPwd]').val())
                return '新密码不能与原密码相同';
        }
    })

    // 3.修改密码
    $('.layui-form').on('submit', function(e) {
        e.preventDefault()
            // 发送ajax
        $.ajax({
            method: 'post',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status != 0) {
                    return layer.msg(res.essage)
                }
                layer.msg('修改密码成功')
                $('.layui-form')[0].reset()
            }
        })
    })
})