/**
 * 通用方法类
 */
var $ = require('jquery');
var _ = require('underscore');
var FormValidator = {
    validator: {
        //用户名验证
        validUserName: function (e) {
            return /^[0-9a-zA-Z\~\!\@\#\$%\^&\*\(\)\-\_\=\+\;\:\'\"\,\<\.\>\/\?\\]{8,30}$/.test(e)
        },
        //密码验证
        validPassword: function (e) {
            return /^[0-9a-zA-Z\~\!\@\#\$%\^&\*\(\)\-\_\=\+\;\:\'\"\,\<\.\>\/\?\\]{8,30}$/.test(e)
        },
        //邮件验证
        isEmail: function (e) {
            return /^[a-zA-Z0-9_+.-]+@([a-zA-Z0-9-]+\.)+[a-z0-9]{2,4}$/i.test(e)
        },
        //年份验证
        isYear: function (e) {
            return /^20[0-9]{2}$/.test(e);
        },
        //整数验证
        isInteger: function (e) {
            return /^[1-9][0-9]*$|^0$/.test(e);
        },
        //数字验证
        isNumber: function (e) {
            return /^[1-9][0-9]*$|^0$|^[1-9]\d*\.[0-9]+$|^[0-9]\.[0-9]+$/.test(e);
        },
        isMobile : function(e){
            return /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/.test(e);
        },
        isPhone : function(e){
            return /^0\d{2,3}-?\d{7,8}$/.test(e);
        }
    },
    /**
     * 数组转化为json
     */
    arrayToJson: function (array) {
        var object = {};
        for (var i = 0; i < array.length; i++) {
            if (_.has(object, array[i].name)) {
                var value_array = [];
                if(object[array[i].name] instanceof Array){
                    value_array =object[array[i].name];
                }else{
                    value_array.push(object[array[i].name]);
                }

                value_array.push(array[i].value);
                object[array[i].name] = value_array;

            } else {
                object[array[i].name] =$.trim(array[i].value);
            }
        }
        return object;
    },

    //表单验证
    validate: function (formid) {
        var formArray = $('#' + formid).serializeArray();
        var isSuccess = true;
        var message;
        var domObj;
        for (var i = 0; i < formArray.length; i++) {
            var itemSuccess = true;
            var idStr = formArray[i].name;
            var value = formArray[i].value.trim();
            domObj = $('#' + idStr);
            var data_validate = domObj.attr('data-validate');
            if (data_validate == undefined || data_validate == "" || data_validate == null) {
                continue;
            }
            var validate = $.parseJSON(domObj.attr('data-validate'));
            //必填项
            if (validate.isRequired) {
                if (value == '') {
                    message = '不能为空';
                    isSuccess = false;
                    itemSuccess = false;
                }
            }
            //年份验证
            if (validate.isYear) {
                if (!this.validator.isYear(value)) {
                    message = '请输入年份(如：2015)';
                    isSuccess = false;
                    itemSuccess = false;
                }
            }
            //整数验证
            if (validate.isInteger) {
                if (!this.validator.isInteger(value)) {
                    message = '请输入数字(如：100)';
                    isSuccess = false;
                    itemSuccess = false;
                }
            }
            //数字验证
            if (validate.isNumber) {
                if (!this.validator.isNumber(value)) {
                    message = '请输入数字(如：20.5)';
                    isSuccess = false;
                    itemSuccess = false;
                }
            }

            //手机号码
            if (validate.isMobile) {
                if (!this.validator.isMobile(value)) {
                    message = '请输入手机号码';
                    isSuccess = false;
                    itemSuccess = false;
                }
            }
            //手机号码
            if (validate.isPhone) {
                if (!this.validator.isPhone(value)) {
                    message = '请输入电话号码（如：0595-00000）';
                    itemSuccess = false;
                    isSuccess = false;
                }
            }

            if (!itemSuccess) {
                domObj.parents('.filed-item').addClass('field-item-error').append('<span class="field-item-error-info">' + message + '</span>');
            }
        }

        var result = {};
        if (!isSuccess) {
            result.is_success = false;
            result.message = message;
        } else {
            result.is_success = true;
            result.formObject = this.arrayToJson(formArray);
        }
        return result;
    },
    initOnBlurValidate(){
        $('.input-area,.input-text').blur(function(e){
            var $currentObj = $(e.target);
            var data_validate = $currentObj.attr('data-validate');
            if (data_validate) {
                var validate = $.parseJSON($currentObj.attr('data-validate'));
                var value = $currentObj.val();
                var message = '';
                var isSuccess = true;
                if (validate.isRequired) {
                    if (value == '') {
                        message = '不能为空';
                        isSuccess = false;
                    }
                }
                //年份验证
                if (validate.isYear) {
                    if (!FormValidator.validator.isYear(value)) {
                        message = '请输入年份(如：2015)';
                        isSuccess = false;
                    }
                }
                //整数验证
                if (validate.isInteger) {
                    if (!FormValidator.validator.isInteger(value)) {
                        message = '请输入数字(如：100)';
                        isSuccess = false;
                    }
                }
                //数字验证
                if (validate.isNumber) {
                    if (!FormValidator.validator.isNumber(value)) {
                        message = '请输入数字(如：20.5)';
                        isSuccess = false;
                    }
                }

                //手机号码
                if (validate.isMobile) {
                    if (!FormValidator.validator.isMobile(value)) {
                        message = '请输入手机号码';
                        isSuccess = false;
                    }
                }
                //手机号码
                if (validate.isPhone) {
                    if (!FormValidator.validator.isPhone(value)) {
                        message = '请输入电话号码（如：0595-00000）';
                        isSuccess = false;
                    }
                }
                if(!isSuccess){
                    $currentObj.parents('.filed-item').addClass('field-item-error').append('<span class="field-item-error-info">' + message + '</span>');
                }

            }

        });
    }

}

export default FormValidator;