$(function() {
  /**
   * 功能: 请求后台一级分类数据渲染到页面
   */
  var currentPage = 1;
  var pageSize = 5;

  // 先渲染依稀
  render();
  
  function render() {
    $.ajax({
      type: 'get',
      url: '/category/queryTopCategoryPaging',
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: 'json',
      success: function(info) {
        // console.log(info);
        $('tbody').html(template('firstTpl', info));
        // 分页
        var pages = Math.ceil(info.total / info.size);
        $('#paginator').bootstrapPaginator({
          bootstrapMajorVersion: 3,
          currentPage: currentPage,
          totalPages: pages,
          onPageClicked: function(a, b, c, page) {
            currentPage = page;
            render();
          }
        })
      }
    })
  }

  /**
   * 功能: 添加分类
   */
  $('#addBtn').click(function() {
    $('#addModal').modal('show');
  })

  // 表单校验
  $('#form').bootstrapValidator({
    // 配置图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',   // 校验成功
      invalid: 'glyphicon glyphicon-remove',   // 校验失败
      validating: 'glyphicon glyphicon-refresh'  // 校验中
    },
    // 配置检验字段
    fields: {
      categoryName: {
        validators: {
          notEmpty: {
            message: '请输入一级分类'
          }
        }
      }
    }
  })

  /**
   * 功能: 添加表单事件, 阻止表单默认提交事件, 通过ajax提交
   */
  $('#form').on('success.form.bv', function(e) {
    e.preventDefault();
    $.ajax({
      type: 'post',
      url: '/category/addTopCategory',
      data: $('#form').serialize(),
      dataType: 'json',
      success: function(info) {
        // console.log(info);
        // 隐藏模态框
        $('#addModal').modal('hide');
        // 重置表单和校验状态
        $('#form').data('bootstrapValidator').resetForm(true);
        // 重新渲染第一页
        currentPage = 1;
        render();
      }
    })
  })
})