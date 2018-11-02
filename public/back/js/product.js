$(function() {
  /**
   * 功能: ajax请求数据
   */
  var currentPage = 1;
  var pageSize = 2;

  render();

  function render() {
    $.ajax({
      type: 'get',
      url: '/product/queryProductDetailList',
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: 'json',
      success: function(info) {
        // console.log(info);
        var stringHtml = template('productTpl', info);
        $('tbody').html(stringHtml);
        // 分页
        $('#paginator').bootstrapPaginator({
          bootstrapMajorVersion: 3,
          currentPage: currentPage,
          totalPages: Math.ceil(info.total / info.size),
          onPageClicked: function(a, b, c, page) {
            currentPage = page;
            render();
          }
        })
      }
    })
  }

  // 点击表格按钮修改商品状态
  // $('body').on('click', '.btn', function() {
  //   // 获取当前产品id
  //   var id = $(this).parent().data('id');
  //   // console.log(id);
  // })

  // 点击添加分类按钮显示模态框
  $('#addBtn').click(function() {
    $('#addModal').modal('show');
    $.ajax({
      type: 'get',
      url: '/category/querySecondCategoryPaging',
      data: {
        page: 1,
        pageSize: 100
      },
      dataType: 'json',
      success: function(info) {
        // console.log(info);
        var stringHtml = template('secondTpl', info);
        $('.dropdown-menu').html(stringHtml);
      }
    })
  })

  // 给二级分类a标签添加点击事件
  $('.dropdown-menu').on('click', 'a', function() {
    // 设置给dropdown
    var txt = $(this).text();
    var id = $(this).data('id');
    $('#dropdownText').text(txt);
    // 将id设置给隐藏域
    $('[name="brandId"]').val(id);
    // 设置校验状态
    $('#form').data('bootstrapValidator').updateStatus('brandId', 'VALID');
  })

  // 上传图片
  // 声明一个数组用来存放图片地址
  var picArr = [];
  $('#fileupload').fileupload({
    dataType: 'json',
    done: function(e, data) {
      // console.log(data.result);
      // 获取图片路径
      var picObj = data.result;
      var picUrl = picObj.picAddr;
      // 图片地址加到前面
      picArr.unshift(picObj);
      // 生成img标签,放到模态框
      $('#img_box').prepend('<img src="' + picUrl + '" height="100">');
      // 如果数组的长度大于3, 删除最后面
      if (picArr.length > 3) {
        picArr.pop();
        // 找到最后一张图片, 删除
        $('#img_box img:last-of-type').remove();
      }
      // 如果图片数量为3, 将校验状态修改为成功
      if (picArr.length === 3) {
        $('#form').data('bootstrapValidator').updateStatus('picStatus', 'VALID');
      }
    }
  })

  // 添加表单校验
  $('#form').bootstrapValidator({
    // 配置对隐藏域也进行校验
    excluded: [],

    // 配置图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',   // 校验成功
      invalid: 'glyphicon glyphicon-remove',   // 校验失败
      validating: 'glyphicon glyphicon-refresh'  // 校验中
    },
    // 配置检验字段
    fields: {
      brandId: {
        validators: {
          notEmpty: {
            message: '请选择二级分类'
          }
        }
      },
      proName: {
        validators: {
          notEmpty: {
            message: '请输入商品名称'
          }
        }
      },
      proDesc: {
        validators: {
          notEmpty: {
            message: '请输入商品描述'
          }
        }
      },
      num: {
        validators: {
          notEmpty: {
            message: '请输入商品库存'
          },
          regexp: {
            regexp: /^[1-9]\d*$/,
            message: '库存格式要求是非零开头的数字'
          }
        }
      },
      size: {
        validators: {
          notEmpty: {
            message: '请输入商品尺码'
          },
          regexp: {
            regexp: /^[1-9]\d-[1-9]\d$/,
            message: '尺码格式必须是 xx-xx 的格式, 例如: 32-40'
          }
        }
      },
      oldPrice: {
        validators: {
          notEmpty: {
            message: '请输入商品原价'
          }
        }
      },
      price: {
        validators: {
          notEmpty: {
            message: '请输入商品现价'
          }
        }
      },
      picStatus: {
        validators: {
          notEmpty: {
            message: '请上传3张图片'
          }
        }
      }
    }
  })

  // 提交商品数据
  // 添加表单校验成功事件
  $('#form').on('success.form.bv', function(e) {
    e.preventDefault();
    var str = $('#form').serialize();
    str += 'picName1=' + picArr[0].picName + '&picAddr1=' + picArr[0].picAddr;
    str += 'picName1=' + picArr[1].picName + '&picAddr1=' + picArr[1].picAddr;
    str += 'picName1=' + picArr[2].picName + '&picAddr1=' + picArr[2].picAddr;
    
    $.ajax({
      type: 'post',
      url: '/product/addProduct',
      data: str,
      dataType: 'json',
      success: function(info) {
        console.log(info);
        // 如果添加成功
        if (info.success) {
          // 隐藏模态框
          $('#addModal').modal('hide');
          // 重新渲染第一页
          currentPage = 1;
          render();
          // 重置表单
          $('#form').data('bootstrapValidator').resetForm(true);
          $('#dropdownText').text('请选择二级分类');
          $('#img_box img').remove();
        }
      }
    })
  })

})