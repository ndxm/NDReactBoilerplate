import React from 'react';
import Styles from './Tip.css';

let Tip = React.createClass({
    
    propTypes: {
        isShowBtn: React.PropTypes.bool,                              //是否显示
        tipType : React.PropTypes.string,                              //类型
        timeout: React.PropTypes.number,                            //显示多久事件后，自动关闭
        message: React.PropTypes.string,                            //显示信息
        tipCallBack: React.PropTypes.func
    },
    
    getDefaultProps() {
        return {
            isShowBtn: false    //是否显示关闭按钮
        }
    },
    getInitialState() {
        return {
            isShow: true
        }
    },
    componentDidMount() {
        if (this.props.timeout > 0) {
            let $that = this;
            window.setTimeout($that.onClose, $that.props.timeout);
        }
    },
    componentDidUpdate() {
        if (this.props.timeout > 0) {
            let $that = this;
            window.setTimeout($that.onClose, $that.props.timeout);
        }
    },
    onClose() {
        //回调函数
        if (this.props.tipCallBack) {
            this.props.tipCallBack();
        }
    },
    
    render() {
        let closer;
        if (this.props.isShowBtn) {
            closer = (
                <a href='javascript:' onClick={this.onClose} className={Styles['close']}><i className="icon-remove"></i></a>
            )
        }

        if(this.props.tipType=='success'){
            return (
                <div className={Styles['mask-success']}>
                    <div className={Styles['tip-success']}>
                        {closer}
                        <i className={"icon-ok-sign "+Styles['logo']}></i>
                        <span className={Styles['success-tip']}>{this.props.message}</span>
                    </div>
                </div>
            )
        }else if(this.props.tipType=='loading'){
            return (
                <div className={Styles['mask-loading']}>
                    <div className={Styles['tip-loading']}>
                        {closer}
                        <i className={"icon-spinner "+Styles['loading']}></i>
                        <span className={Styles['loading-tip']}>{this.props.message}</span>
                    </div>
                </div>
            )
        }else{
            return (
                <div className='mask'>
                    <div className={Styles['tip']}>
                        {closer}
                        {this.props.message}
                    </div>
                </div>
            )
        }


    }
});

export default Tip;