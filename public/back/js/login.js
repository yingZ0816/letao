/**
 * 功能: 表单校验
 *      用户名不能为空, 长度必须是2-6位
 *      密码不能为空, 长度必须是6-12位
 */
$(function() {
  $('#form').bootstrapValidator({
    // 指定校验时图标显示
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },


    // 配置校验字段
    fields: {
      // 配置用户名校验
      username: {
        // 配置校验规则
        validators: {
          // 非空校验
          notEmpty: {
            // 非空提示
            message: '用户名不能为空'
          },
          // 长度校验
          stringLength: {
            min: 2,
            max: 6,
            message: '用户名必须是2~6位'
          },
          // 用以配置 ajax 回调的提示
          callback: {
            message: '用户名不存在'
          }
        }
      },
      // 配置密码校验
      password: {
        // 配置校验规则
        validators: {
          // 非空校验
          notEmpty: {
            // 提示信息
            message: '密码不能为空'
          },
          // 长度校验
          stringLength: {
            min: 6,
            max: 12,
            message: '密码必须是6~12位'
          },
          callback: {
            message: '密码错误'
          }
        }
      }
    }
  });

  /**
 * 功能2: 提交功能
 *        表单校验插件会在表单提交时进行校验, 如果希望通过ajax提交
 *        可以注册表单验证成功事件, 在事件中阻止默认的跳转提交, 通过ajax进行提交
 */

  $('#form').on('success.form.bv', function( e ) {
    e.preventDefault();  // 阻止了默认的提交
    // console.log(1);
    // 通过ajax提交数据
    $.ajax({
      type: 'post',
      url: '/employee/employeeLogin',
      data: $('#form').serialize(),
      dataType: 'json',
      success: function( info ) {
        console.log(info);
        if (info.success) {
          location.herf = 'index.html';
        }
        if (info.error === 1000) {
          // console.log(info.message);
          // 修改状态
          // updateStatus
          $('#form').data('bootstrapValidator').updateStatus('username', 'INVALID', 'callback');
        }
        if (info.error === 1001) {
          $('#form').data('bootstrapValidator').updateStatus('password', 'INVALID', 'callback');
        }
      }
    })
  })


/**
 * 功能: 解决重置bug
 */
  $('[type="reset"]').click(function() {
    // 调用实例的方法reset
    // 不传参 只重置内容
    // 传参true 重置内容和校验状态
    $('#form').data('bootstrapValidator').resetForm(true);
  })
})



