$(function() {
  /**
   * 功能: 从后台请求数据渲染导航栏
   */
  $.ajax({
    type: 'get',
    url: '/category/queryTopCategory',
    dataType: 'json',
    success: function(info) {
      console.log(info);
      var htmlStr = template('navTpl', info);
      $('.lt_nav ul').html(htmlStr);
      render(info.rows[0].id);
    }
  })

  /**
   * 功能: 给导航添加点击事件, 显示对应品牌
   */
  $('.lt_nav ul').on('click', 'a', function() {
    // 添加current类
    $(this).addClass('current').parent().siblings().find('a').removeClass('current');
    // 获取id
    var id = $(this).data('id');
    render(id);
    
  })

  function render(id) {
    $.ajax({
      type: 'get',
      url: '/category/querySecondCategory',
      data: {id: id},
      dataType: 'json',
      success: function(info) {
        console.log(info);
        var htmlStr = template('brandTpl', info);
        $('.lt_brand ul').html(htmlStr);
      }
    })
  }
})