$(function() {

    //为art-template 定义时间过滤器
    template.defaults.imports.dateFormat = function(date) {

        var dt = new Date(date)

        var y = dt.getFullYear()
        var m = padzero(dt.getMonth() + 1)
        var d = padzero(dt.getDate())

        var hh = padzero(dt.getHours())
        var mm = padzero(dt.getMinutes())
        var ss = padzero(dt.getSeconds())
        return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
    }

    function padzero(n) {
        return n > 9 ? n : '0' + n
    }

    //定义一个变量,存储分页参数
    var p = {
        pagenum: 1, //页码
        pagesize: 2, //每页显示多少条数据
        cate_id: '', //文章分类的Id
        state: '' //文章的状态
    };
    // 1.初始化文章列表
    initTable();

    // 2.渲染文章分类 
    initCate()

    // 3.筛选提交
    $('#form-search').on('submit', function(e) {
        e.preventDefault();
        //修改p参数
        p.cate_id = $('[name=cate_id]').val()
        p.state = $('[name=state]').val()
        initTable()
    })


    // 4.删除
    $('tbody').on('click', '.btn-delete', function() {
        var Id = $(this).attr('data-id')
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function(index) {
            //do something
            $.ajax({
                method: 'get',
                url: '/my/article/delete/' + Id,
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg(res.message)
                    }
                    layer.msg(res.message)
                    $('.btn-delete').length == 1 && p.pagenum > 1 && p.pagenum--;
                    initTable()
                    layer.close(index);
                }
            })

        });
    })



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




    //封装初始化文章列表函数
    function initTable() {
        $.ajax({
            method: 'get',
            url: '/my/article/list',
            data: p,
            success: function(res) {
                if (res.status != 0) {
                    return layer.msg(res.message)
                }
                // console.log(res);
                //模板引擎渲染
                var htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)

                //文章分页
                renderPage(res.total)
            }
        })
    }


    //文章分页
    function renderPage(total) {
        layui.laypage.render({
            elem: 'pageBox',
            count: total,
            curr: p.pagenum, //获取起始页
            limit: p.pagesize,
            limits: [2, 3, 5, 10],
            layout: ['count', "limit", 'prev', 'page', 'next', 'skip'],
            jump: function(obj, first) {
                p.pagenum = obj.curr;
                p.pagesize = obj.limit;
                !first && initTable()
            }
        });
    }

})