/**
 * 功能: 表单校验
 *      用户名不能为空, 长度必须是2-6位
 *      密码不能为空, 长度必须是6-12位
 */
$(function() {
  $('#form').bootstrapValidator({
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
          }
        }
      }
    }
  });
})