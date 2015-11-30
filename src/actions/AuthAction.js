import {LOGIN,LOGIN_REQUEST,LOGIN_SUCCESS,LOGIN_FAILED} from './type/ActionTypes';
import {LOGOUT,LOGOUT_SUCCESS} from './type/ActionTypes';
import { pushState } from 'redux-router';
import AuthService from '../services/AuthService';
import RequestExceptionUtil from '../utils/RequestExceptionUtil';

/**
 * 用户登录请求开始请求
 * @param user
 */
function loginRequest(user) {
    return {
        type: LOGIN_REQUEST,
        user: user
    }
}


/**
 * 用户登录成功
 * @param res
 */
function loginSuccess(res) {
    return {
        type: LOGIN_SUCCESS,
        res: res,
        receivedAt: Date.now()
    }
}

/**
 * 用户登录失败
 * @param message
 */
function loginFailed(message) {
    return {
        type: LOGIN_FAILED,
        message: message
    }
}


/**
 * 用户登录
 * @param user 用户
 * @returns {Function}
 */
export function login(user) {

    return function (dispatch) {
        dispatch(loginRequest(user));

        return AuthService.login(user).then((response) => {
            let res = {
                user_id: response["user_id"],
                user_name: response["user_name"],
                nick_name: response["nick_name"],
                role: response["role_name"],
                access_token: response["access_token"],
                mac_key: response["mac_key"],
                expires_at: response["expires_at"]
            };

            createLocalStorage(response);

            dispatch(loginSuccess(res));
            dispatch(pushState(null, '/'));
        }).catch((err) => {
            let msg = RequestExceptionUtil.getError(err, '用户名或密码错误');
            dispatch(loginFailed(msg));
        }).finally(() => {

        });


    }

}

/**
 * 退出
 * @returns {Function}
 */
export function logout() {

    return function (dispatch) {
        clearLocalStorage();
        dispatch(logoutSuccess());
        dispatch(pushState(null, '/login'));
    }

}

/**
 * 退出成功
 * @returns {{type}}
 */
export function logoutSuccess() {
    return {
        type: LOGOUT_SUCCESS
    }
}

/**
 * 创建LocalStorage
 * @param res
 */
function createLocalStorage(res) {

    localStorage.user = JSON.stringify({
        user_id: res["user_id"],
        nick_name: res["nick_name"],
        user_name: res["user_name"],
        role: res["role_name"]
    });
    localStorage.expires_at = res["expires_at"];
    localStorage.token = res["access_token"];
    localStorage.mac_key = res["mac_key"];

}


/**
 * 清除LocalStorage
 */
function clearLocalStorage() {
    delete localStorage.user;
    delete localStorage.token;
    delete localStorage.mac_key;
    delete localStorage.expires_at;
}