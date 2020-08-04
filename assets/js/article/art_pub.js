$(function() {
    //1.渲染文章分类
    initCate();

    // 2.初始化富文本编辑器
    initEditor()



    // 分装渲染文章分类函数
    var form = layui.form;

    function initCate() {
        $.ajax({
            method: 'get',
            url: '/my/article/cates',
            success: function(res) {
                if (res.status != 0) {
                    return layer.msg(res.message)
                }
                var htmlStr = template('tpl-cate', res)
                $('[name=cate_id]').html(htmlStr);
                //重新渲染form,数据与页面同步
                form.render()
            }
        })
    }
    // 3.1 初始化图片裁剪器
    var $image = $('#image')

    // 3.2 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3.3 初始化裁剪区域
    $image.cropper(options)

    // 4.1修改文字封面
    $('#btnChooseImage').on('click', function() {
        $('#coverFile').click()
    });

    // 4.2修改文字封面
    $('#coverFile').on('change', function(e) {
        //拿到用户选择的文件
        var file = e.target.files[0];
        if (file.length === 0) return layer.msg('请上传图片!');
        //根据选择的文件，创建一个对应的 URL 地址：
        var newImgURL = URL.createObjectURL(file);
        //先`销毁`旧的裁剪区域，再`重新设置图片路径`，之后再`创建新的裁剪区域`
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    })

    // 5.1确认发布状态
    var state = '已发布'
    $('#btnSave2').on('click', function() {
        state = '草稿'
    });

    // 5.2添加文章(上面的两个按钮,点击那个都会触发)
    $('#form-add').on('submit', function(e) {
        e.preventDefault()
        var fd = new FormData(this)
        fd.append("state", state)
        $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function(blob) { // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                fd.append("cover_img", blob);
                // 异步耗时
                publishArticle(fd)
            })
    })

    // 定义一个发布文章的方法
    function publishArticle(fd) {
        $.ajax({
            method: 'post',
            url: '/my/article/add',
            data: fd,
            contentType: false,
            processData: false,
            success: function(res) {
                if (res.status != 0) {
                    return layer.msg('发布文章失败!')
                }
                layer.msg('发布文章成功!')
                window.parent.document.getElementById('a2').click()
            }
        })
    }





})