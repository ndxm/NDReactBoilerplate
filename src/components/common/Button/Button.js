var React = require('react');
var Styles = require('./Button.css');
var _ = require('underscore');
import { Link } from 'react-router';
import $ from 'jquery';

var Button = React.createClass({
    propTypes :{

        innerStyle  : React.PropTypes.object,                                                       //高度
        type        : React.PropTypes.oneOf(['ADD','DELETE','SETTING','LOGOUT','BACK','SEARCH','UPLOAD','IMPORT','SAVE','NOTIFY','CONFIRM','CANCEL','EXPORT','OK','DECLINE','DISABLED']),   //按钮类型
        buttonName  : React.PropTypes.string,                                                       //按钮名称
        height      : React.PropTypes.string,
        className   :React.PropTypes.string,
        disabled    : React.PropTypes.bool,                                                         //是否失效
        isLink      : React.PropTypes.bool,                                                         //是不是Link
        linkUrl     : React.PropTypes.string,                                                       //链接地址
        callback    : React.PropTypes.func                                                          //回调函数
    },
    _buttonIcon :[
        {
            name : 'ADD',
            icon : 'icon-plus'
        },{
            name : 'BACK',
            icon : 'icon-chevron-sign-left'
        },{
            name : 'UPLOAD',
            icon : 'icon-upload-alt'
        },{
            name : 'LOGOUT',
            icon : 'icon-signout'
        },{
            name : 'SETTING',
            icon : 'icon-cog'
        },{
            name : 'SEARCH',
            icon : 'icon-search'
        },{
            name : 'DELETE',
            icon : 'icon-trash'
        },{
            name : 'COMPLETE',
            icon : 'icon-ok-sign'
        },{
            name : 'IMPORT',
            icon :'icon-long-arrow-down'
        },{
            name : 'SAVE',
            icon :'icon-save'
        },{
            name : 'NOTIFY',
            icon :'icon-envelope-alt'
        },{
            name : 'CONFIRM',
            icon : 'icon-confirm'
        },{
            name : 'EXPORT',
            icon : 'icon-download-alt'
        },{
            name : 'CANCEL',
            icon : 'icon-cancel'
        },{
            name : 'OK',
            icon : 'icon-ok'
        },{
            name : 'DECLINE',
            icon : 'icon-remove'
        },{
            name : 'DISABLED',
            icon : 'icon-ban-circle'
        }
    ],
    getIcon : function(){
        if(this.props.type) {
            var icon = _.where(this._buttonIcon, {name: this.props.type})[0];
            return icon.icon;
        }else{
            return null;
        }
    },
    onClick : function(e){
        var $disableBtn = $(e.target).parents('.disable-button');
        var $currentBtn = $(e.target);
        if($disableBtn.length>0||$currentBtn.hasClass('disable-button')){
            e.preventDefault();
            return;
        }

        if(this.props.callback&&!this.props.disabled){
            this.props.callback();
        }
    },
    render : function(){
        var buttonElement;
        var classname;

        if(!this.props.disabled){
            classname= Styles['button'];
        }else{
            classname = Styles['button-disabled'];
        }
        if(this.props.isLink){
            buttonElement = (
                <Link to={this.props.linkUrl} className={classname+' '+this.props.className} style={this.props.innerStyle} onClick={this.onClick}>
                    <i className={this.getIcon()}></i>{this.props.buttonName}
                </Link>
            )
        }else{
            buttonElement = (
                <a href={this.props.linkUrl?this.props.linkUrl:'javascript:;'} className={classname+' '+this.props.className} style={this.props.innerStyle} onClick={this.onClick}>
                    <i className={this.getIcon()}></i>{this.props.buttonName}
                </a>
            )
        }

        return (
            buttonElement
        )

    }
});

export default Button;