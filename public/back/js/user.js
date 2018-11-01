$(function() {
  var currentPage = 1;
  var pageSize = 5;

  var currentId;  // 记录当前用户的id
  var isDelete;  // 修改的状态
  // 先渲染一次
  render();

  function render() {
    // ajax请求用户数据
    $.ajax({
      type: 'get',
      url: '/user/queryUser',
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: 'json',
      success: function(info) {
        // console.log(info);
        $('tbody').html(template('tmp', info));
        // 分页
        var page = Math.ceil(info.total / info.size);
        $('#paginator').bootstrapPaginator({
          bootstrapMajorVersion: 3,
          currentPage: currentPage,
          totalPages: page,
          onPageClicked: function(a, b, c, page) {
            // console.log(page);
            currentPage = page;
            render();
          }
        })
      }
    })
  }


  /**
   * 功能: 启用禁用
   * 事件委托: 给动态生成的元素添加事件
   *          批量注册事件
   */
  // 点击显示模态框
  $('tbody').on('click', '.userBtn', function() {
    $('#userModal').modal('show');
    // 获取父元素中的id
    currentId = $(this).parent().data('id');
    console.log(currentId);
    isDelete = $(this).hasClass('btn-danger') ? 0 : 1 ;
  })

  // 点击确认按钮, 修改状态
  $('#submitBtn').click(function() {
    $.ajax({
      type: 'post',
      url: '/user/updateUser',
      data: {
        id: currentId,
        isDelete: isDelete
      },
      dataType: 'json',
      success: function(info) {
        console.log(info);
        // 隐藏模态框
        $('#userModal').modal('hide');
        // 重新渲染页面
        render();
      }
    })
  })
})