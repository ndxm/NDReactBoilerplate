import React from 'react';
import Styles from './FileUpload.css';
import Tip from '../Tip/Tip';

let FileUpload = React.createClass({
    propTypes: {
        refValue: React.PropTypes.string,           //ref
        changeCallback: React.PropTypes.func,             //值变化回调
        uploadCallback: React.PropTypes.func              //上传回调
    },
    getInitialState(){
        return {
            isUpload: false,
            isUploading: false,
            tip: null,
            result: '  ',
            file: null
        }
    },
    addFile(){
        this.refs[this.props.refValue].getDOMNode().click();
    },
    uploadFile(){
        /**
         * 上传图片
         */
        if (this.state.file) {
            if (this.props.uploadCallback && !this.state.isUpload && !this.state.isUploading) {
                this.props.uploadCallback(this.state.file, this.uploadedCallback);
            }
        } else {
            this.setState({
                isUpload: false,
                result: '请选择...'
            });
        }
    },
    uploadedCallback(filename, flag){
        if (!flag) {
            /**
             * 上传出错
             */
            this.setState({
                tip: <Tip isShowBtn={true} timeout={1000} message={'上传出错了...'} tipCallBack={this.tipCallBack}/>,
                isUpload: false,
                result: '上传出错'
            })
        } else {
            /**
             * 上传成功
             */
            this.setState({
                isUpload: true,
                result: '上传成功'
            });

            this.refs[this.props.refValue + '_value'].getDOMNode().value = filename;
        }
    },
    tipCallBack(){
        this.setState({
            tip: null
        })
    },
    onChange: function (e) {
        if (e.target.files.length > 0) {

            this.refs[this.props.refValue + '_value'].getDOMNode().value = e.target.files[0].name;
            this.setState({
                isUpload: false,
                result: '  ',
                file: e.target.files[0]
            });
        }

        if (this.props.changeCallback) {
            this.props.changeCallback();
        }
    },
    render(){

        let status;
        if (this.state.isUploading) {
            status = (
                <em className={Styles['result']}>上传中...</em>
            )
        } else {
            status = (
                <em className={Styles['result']+' '+(this.state.isUpload?Styles['success']:Styles['error'])}>{this.state.result}</em>
            )
        }

        return (
            <div className={Styles['FileuploadBox'] + ' clearfix'}>
                <input type='file' ref={this.props.refValue} id={this.props.refValue} name={this.props.refValue}
                       onChange={this.onChange} className={Styles['fileinput']}/>

                <div className={Styles['box-inner']}>
                    <input type='text' disabled='disabled' ref={this.props.refValue+'_value'}
                           id={this.props.refValue+'_value'} name={this.props.refValue+'_value'} placeholder='请选择文件'
                           className={Styles['textinput']}/>
                    <a href='javascript:' className={Styles['add-file']} onClick={this.addFile}><i
                        className="icon-plus-sign-alt"></i></a>
                </div>
                <a href='javascript:' className={Styles['upload-file']} onClick={this.uploadFile}><i
                    className="icon-upload-alt"></i> 上传</a>
                {status}
            </div>
        )
    }
});

export default FileUpload;