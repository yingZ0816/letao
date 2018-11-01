$(function() {
  var currentPage = 1;
  var pageSize = 5;
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

})