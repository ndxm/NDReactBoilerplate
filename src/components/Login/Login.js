import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { pushState } from 'redux-router';
import styles from './login.css';
import { login } from '../../actions/AuthAction'

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isPasswordFieldFocus: false,
            isNameFieldFocus: false,
            showPassword: false,
            userCheckStatus: false,
        }
    }

    componentDidMount() {
        if (this.props.isLoggedIn) {
            this.props.redirectToMain();
        }
    }

    /**
     * 表单提交
     */
    handleFormSubmit(e) {
        e.preventDefault();
        this.setState({
            userCheckStatus: true,
            loginErr: ''
        });
        if (this.state.username === '' || this.state.password === '') {
            return
        }

        this.props.onLogin({
            username: (this.state.username),
            password: this.state.password
        })
    }

    /**
     * 用户名变化
     */
    handleUsernameChange(e) {
        this.setState({
            username: e.currentTarget.value.trim()
        })
    }

    /**
     * 密码变化
     */
    handlePasswordChange(e) {
        this.setState({
            password: e.currentTarget.value.trim()
        })
    }

    /**
     * 显示密码
     */
    handleShowPassword(e) {
        this.setState({
            showPassword: e.currentTarget.checked
        })
    }

    /**
     * 密码输入框失去焦点
     */
    blurPasswordField() {
        this.setState({
            isPasswordFieldFocus: false
        })
    }

    /**
     * 密码输入框获得焦点
     */
    focusPasswordField() {
        if (this.state.showPassword) {
            return;
        }
        this.setState({
            isPasswordFieldFocus: true
        })
    }

    render() {

        let errForUsername, errForPassword;
        if (this.state.userCheckStatus) {
            errForUsername = this.state.username === '' ? '请输入用户名' : '';
            errForPassword = this.state.password === '' ? '请输入密码' : '';
        }

        return (
            <div>
                <div className={styles['loginBody']}>
                    <div className={styles['loginRoad']}></div>
                </div>
                <div className={styles['loginPanel']}>
                    <div
                        className={styles['loginHi'] + "   " + (this.state.isPasswordFieldFocus?styles['focusPassword']:"")}></div>
                    <h1 className={styles['siteTitle']}>智能出题管理后台</h1>
                    <form noValidate onSubmit={this.handleFormSubmit.bind(this)} className={`${styles['c-form']}`}>
                        <div>
                            <div className={`${styles['c-form__input']}`}>
                                <span className={styles['c-form__label']+" "+styles['c-form-name']}></span>
                                <input
                                    className={errForUsername ? `${styles['c-form__inputBox']} ${styles['c-form__inputBox--err']}` : `${styles['c-form__inputBox']}`}
                                    placeholder="工号/学号"
                                    type='text' value={this.state.username}
                                    onChange={this.handleUsernameChange.bind(this)}/>

                                <span className={`${styles['c-form__err']}`}>{errForUsername}</span>
                            </div>
                            <div className={`${styles['c-form__input']}`}>
                                <span className={styles['c-form__label'] +" "+styles['c-form-pwd']}></span>
                                <input
                                    className={errForPassword ? `${styles['c-form__inputBox']} ${styles['c-form__inputBox--err']}` : `${styles['c-form__inputBox']}`}
                                    type={this.state.showPassword ? 'text' : 'password'} value={this.state.password}
                                    placeholder="密码"
                                    onFocus={this.focusPasswordField.bind(this)}
                                    onBlur={this.blurPasswordField.bind(this)}
                                    onChange={this.handlePasswordChange.bind(this)}/>
                                <span className={`${styles['c-form__err']}`}>{errForPassword}</span>
                            </div>

                        </div>
                        <div className={styles['loginFormBtn']}>
                            <input type='submit' value='登录' className={`${styles['c-form__btn']}`}/>
                        </div>
                        <div  className={styles['error-login']}>
                            {this.props.loginErr}
                        </div>
                    </form>
                </div>
            </div>
        );
    }

}


Login.propTypes = {}

function mapStateToProps(state) {
    return {
        isLoggedIn: state.auth.token ? true : false,
        loginErr: state.auth.loginErr
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onLogin: (user) => dispatch(login(user)),
        redirectToMain: () => dispatch(pushState(null, "/"))
    }
}


export default  connect(mapStateToProps, mapDispatchToProps)(Login);