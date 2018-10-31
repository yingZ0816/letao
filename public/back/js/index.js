$(function() {
  var leftChart = echarts.init(document.querySelector('.charts_left'));
  // 基于准备好的dom，初始化echarts实例
  // var myChart = echarts.init(document.getElementById('main'));

  // 指定图表的配置项和数据
  var option = {
    // 大标题
    title: {
      text: '2018年上半年销量'
    },
    // 提示框组件
    tooltip: {},
    // 图例, 用于解释说明的
    legend: {
      data:['销量', '利润额']
    },
    // X轴
    xAxis: {
      data: ["1月","2月","3月","4月","5月","6月"]
    },
    // Y轴的刻度是根据数据自动生成的
    yAxis: {},
    series: [{
      name: '销量',
      // type: 设置图表的类型   bar 柱状图  line 折线图 pie 饼图
      type: 'bar',
      data: [5, 20, 36, 10, 10, 20]
    },
    {
      name: '利润额',
      // type: 设置图表的类型   bar 柱状图  line 折线图 pie 饼图
      type: 'bar',
      data: [10, 20, 36, 10, 20, 50]
    }]
  };

  // 使用刚指定的配置项和数据显示图表。
  leftChart.setOption(option);

  var rightChart = echarts.init(document.querySelector('.charts_right'));
  option1 = {
    title : {
      text: '热门小说排行',
      subtext: '上半年',
      x:'center',
      textStyle: {
        color: 'red',
        fontSize: 25
      }
    },
    tooltip : {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    // 控制图例的方向,  vertical垂直,  horizontal 水平的
    legend: {
      orient: 'vertical',
      left: 'left',
      data: ['东方玄幻','魔幻修仙','穿越重生','都市言情','破案悬疑']
    },
    // 系列
    series : [
      {
        name: '访问来源',
        type: 'pie',
        // 配置圆的大小
        radius : '55%',
        // 圆心坐标
        center: ['50%', '60%'],
        data:[
          {value:335, name:'东方玄幻'},
          {value:310, name:'魔幻修仙'},
          {value:234, name:'穿越重生'},
          {value:135, name:'都市言情'},
          {value:1548, name:'破案悬疑'}
        ],
        // 阴影效果
        itemStyle: {
          emphasis: {
            shadowBlur: 100,
            shadowOffsetX: 10,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };

  rightChart.setOption(option1);
})