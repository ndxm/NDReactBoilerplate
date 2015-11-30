var React = require('react');
var Styles = require('./Confirm.css');

var Confirm = React.createClass({
    propTypes :{
        title           : React.PropTypes.string,            //提示标题
        message         : React.PropTypes.string,           //提示信息
        cancelCallback  : React.PropTypes.func,             //取消回调函数
        confirmCallback : React.PropTypes.func              //确认回调函数
    },
    getDefaultProps : function(){
        return {
            title   : '提示信息'
        }
    },
    onCancel : function(){
        if(this.props.cancelCallback){
            this.props.cancelCallback();
        }
    },
    onConfirm : function(){
        if(this.props.confirmCallback){
            this.props.confirmCallback();
        }
    },
    render : function(){
        return (
            <div className='mask '>
                <div className='dialog'>
                    <div className='dialog-title'>
                        {this.props.title}
                        <a href='javascript:' className='close-dialog' onClick={this.onCancel}><i className='icon-remove'></i></a>
                    </div>
                    <div className='dialog-message message-content'>{this.props.message}</div>
                    <div className='dialog-btns'>
                        <a href='javascript:' className={Styles['btn-cancel']} onClick={this.onCancel}>取消</a>
                        <a href='javascript:' className={Styles['btn-confirm']} onClick={this.onConfirm}>确认</a>
                    </div>
                </div>
            </div>
        )
    }
});

export default Confirm;