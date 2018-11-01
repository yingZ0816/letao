/**
 * 用户一进入页面, 需要先判断用户是否登录(发送请求询问后台), 如果是已登录才能继续访问
 */
$.ajax({
  type: 'get',
  url: '/employee/checkRootLogin',
  dataType: 'json',
  success: function(info) {
    // console.log(info);
    if (info.error === 400) {
      location.href = 'login.html';
    }
    if (info.success) {
      console.log('用户已登录');
    }
  }
})