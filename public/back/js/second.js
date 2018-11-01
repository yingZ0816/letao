$(function() {
  /**
   * 功能: 请求后台数据, 并渲染页面
   */
  var currentPage = 1;
  var pageSize = 5;

  render();

  function render() {
    $.ajax({
      type: 'get',
      url: '/category/querySecondCategoryPaging',
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: 'json',
      success: function(info) {
        // console.log(info);
        $('tbody').html(template('secondTpl', info));
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

  // 添加分类点击事件
  $('#addBtn').click(function() {
    $('#addModal').modal('show');

    $.ajax({
      type: 'get',
      url: '/category/queryTopCategoryPaging',
      data: {
        page: 1,
        pageSize: 100
      },
      dataType: 'json',
      success: function(info) {
        // console.log(info);
        $('.dropdown-menu').html(template('firstTpl', info));
      }
    })
  })

  // 给以及分类元素添加点击事件, 让按钮内容相应更新
  $('.dropdown-menu').on('click','a', function() {
    // 让选择框的内容更新
    var txt = $(this).text();
    $('#dropdownText').text(txt);
    // 更新隐藏域id
    $('#categoryId').val($(this).data('id'));

    // 让一级分类对应的隐藏域, 校验状态设置成 校验成功
    // 参数1: 字段名称
    // 参数2: 校验状态
    // 参数3: 配置校验规则, 用来显示错误信息
    $('#form').data('bootstrapValidator').updateStatus('categoryId', 'VALID');
  })

  // 图片上传
  $('#fileupload').fileupload({
    dataType: 'json',
    done: function(e, data) {
      var picUrl = data.result.picAddr;
      $('#img_box img').attr('src', picUrl);
      // 更新隐藏域的图片链接
      $('#brandLogo').val(picUrl);
      // 让 隐藏域 校验状态变成 校验成功
      $('#form').data('bootstrapValidator').updateStatus('brandLogo', 'VALID');
    }
  })

  // 表单验证
  $('#form').bootstrapValidator({
    // 配置对任何表单都验证
    // 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
    excluded: [],
    // 配置图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',   // 校验成功
      invalid: 'glyphicon glyphicon-remove',   // 校验失败
      validating: 'glyphicon glyphicon-refresh'  // 校验中
    },
    // 指定校验字段
    fields: {
      categoryId: {
        // 配置校验规则
        validators: {
          notEmpty: {
            message: '请选择一级分类'
          }
        }
      },
      brandName: {
        validators: {
          notEmpty: {
            message: '请输入二级分类名称'
          }
        }
      },
      brandLogo: {
        validators: {
          notEmpty: {
            message: '请选择图片'
          }
        }
      }
    }
  })

  // 注册表单校验成功事件, 阻止默认提交, 使用ajax
  $('#form').on('success.form.bv', function(e) {
    e.preventDefault();

    $.ajax({
      type: 'post',
      url: '/category/addSecondCategory',
      data: $('#form').serialize(),
      dataType: 'json',
      success: function(info) {
        console.log(info);
        if (info.success) {
          // 隐藏模态框
          $('#addModal').modal('hide');
          // 重置模态框
          $('#form').data('bootstrapValidator').resetForm(true);
          // 重新渲染第一页
          currentPage = 1;
          render();
          // img图片和下拉菜单不是表单元素, 需要手动重置
          $('#dropdownText').text('请选择一级分类');
          $('#img_box img').attr('src','images/none.png');
        }
      }
    })
  })
})