/**
 * 功能: 添加进度条, 当第一个ajax请求发送之前触发, 当最后一个ajax请求结束之后触发
 */
$(document).ajaxStart(function() {
  NProgress.start();
});
$(document).ajaxStop(function() {
  // 模拟请求延迟
  setTimeout(function() {
    NProgress.done();
  }, 500)
})


$(function() {
  /**
   * 功能1: 侧边栏功能隐藏显示切换功能
   * 功能2: 分类管理耳机菜单显示隐藏切换功能
   * 功能3: 模态框退出功能, 退出登录状态, 并跳转淘登录页面
   */
  // 侧边栏
  $('.topbar .icon_menu').click(function() {
    $('.aside').toggleClass('hidemenu');
    $('.main').toggleClass('hidemenu');
    $('.main .topbar').toggleClass('hidemenu');
  })
  // 二级分类
  $('.nav .category').click(function() {
    $(this).next().stop().slideToggle();
  })
  // 模态框
  $('.main .topbar .logout').click(function() {
    $('#logout').show();
  })

  $('#logout .logoutBtn').click(function() {
    $.ajax({
      type: 'get',
      url: '/employee/employeeLogout',
      dataType: 'json',
      success: function(info) {
        // console.log(info);
        if(info.success) {
          location.href = 'login.html';
        }
      }
    })
  })
})