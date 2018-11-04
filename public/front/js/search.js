$(function() {
  /**
   * 功能: 1-获取localStorage里面搜索历史的数据, 渲染到页面
   */
  // localStorage.clear();
  // var search_list = ['桃花', '樱花', '玫瑰', '百合'];
  // localStorage.setItem('search_list', JSON.stringify(search_list));
  
  // 先渲染一次
  render();
  

  /**
   * 功能2: 点击删除按钮, 删除当前搜索记录
   */

  $('.history').on('click', '.delBtn', function() {
    // 获取当前index
    var index = $(this).data('index');
    // 取出搜索数据
    var arr = getSearch();
    // 删除下标为index的元素
    arr.splice(index, 1);
    // console.log(arr);
    // 存入localStorage
    localStorage.setItem('search_list', JSON.stringify(arr));
    // 重新渲染页面
    render();

  })

  /**
   * 功能3: 点击清空按钮, 清空历史搜索记录
   */
  $('.history').on('click', '.eptBtn', function() {
    mui.confirm('您确定要执行此操作吗', '温馨提示', ['取消', '确认'], function(e) {
      console.log(e);
      if (e.index === 1) {
        localStorage.removeItem('search_list');
        render();
      }
    })
    
  })

  /**
   * 功能4: 当点击搜索按钮时, 获取搜索框关键词, 添加到历史记录
   * 
   * 优化: 1-如果是重复的搜索数据, 将原来的删除, 将新的添加到最前面, 如果输入为空, 提醒用户
   * 优化: 2-如果本例搜索数据超过10个, 将后面的删除
   */
  $('.searchBtn').click(function() {
    // 获取关键字
    var key = $('.lt_main .search input').val().trim();
    // 判断key是否为空
    if(key === '') {
      mui.toast('请输入搜索关键字');
      return;
    }
    var arr = getSearch();
    // 判断输入的key是否已经存在
    var index = arr.indexOf(key);
    if (index != -1) {
      // 删除原有数据
      arr.splice(index, 1);
      // 将新的关键字添加到数组最前面
    }
    if(arr.length >= 10) {
      arr.pop();
    }
    arr.unshift(key);
    // 放入本地存储
    localStorage.setItem('search_list', JSON.stringify(arr));
    // 重新渲染页面
    render();
    // 清空搜索框
    $('.lt_main .search input').val('');
    // 跳转到搜索列表页并将关键字传递给搜索列表页
    location.href = 'searchList.html?key=' + key;
  })

  // 封装获取搜索数据的方法
  function getSearch() {
    var str = localStorage.getItem('search_list');
    var arr = JSON.parse(str) || [];
    // console.log(arr);
    return arr;
  }

  // 封装渲染搜索数据的方法
  function render() {
    var arr = getSearch();
    var htmlStr = template('searcchTpl', {list: arr});
    $('.history').html(htmlStr);
  }
})