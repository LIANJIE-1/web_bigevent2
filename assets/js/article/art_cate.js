$(function() {
    var index = null;
    // 1.文章分类列表渲染
    initArtCateList();

    // 2.添加文章分类
    $('#addArtCate').on('click', function() {
        index = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $('#dialog-add').html()
        });
    })


    // 3.文章分类添加
    $('body').on('submit', '#boxAddCate', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'post',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status != 0) {
                    return layer.msg(res.message)
                }
                initArtCateList()
                layer.msg(res.message)
                layer.close(index)
            }
        })
    })


    // 4.修改文章分类 显示
    var index2 = null
    $('tbody').on('click', '.btn-edit', function() {
        // 4.1展示
        index2 = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '修改文章分类',
            content: $('#dialog-edit').html()
        });
        //4.2渲染
        var Id = $(this).attr('data-id');
        // console.log(Id);
        $.ajax({
            method: 'get',
            url: '/my/article/cates/' + Id,
            success: function(res) {
                layui.form.val('dialog-edit', res.data)
            }
        })
    });

    //4.当编辑文章分类修改表单发送提交事件
    $('body').on('submit', '#boxEditCate', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'post',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status != 0) {
                    return layer.msg(res.message)
                }
                initArtCateList()
                layer.msg(res.message)
                layer.close(index2)
            }
        })
    })


    // 6.删除文章分类
    $('tbody').on('click', '.btn-delete', function() {
        var Id = $(this).attr('data-id')
        layer.confirm('是否确认删除当前文章分类?', { icon: 3, title: '提示' }, function(index) {
            //do something
            $.ajax({
                method: 'get',
                url: '/my/article/deletecate/' + Id,
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg(res.message)
                    }
                    layer.msg(res.message)
                    layer.close(index);
                    initArtCateList()
                }
            })

        });
    })


    //文章分类列表渲染函数封装
    function initArtCateList() {
        $.ajax({
            method: 'get',
            url: '/my/article/cates',
            success: function(res) {
                if (res.status != 0) return layer.msg(res.message);
                // layer.msg(res.message)
                // console.log(res.data);
                var htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
            }
        })
    }


})