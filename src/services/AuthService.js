/**
 * 权限验证Service
 */

import BaseService from './BaseService';
import APIPathPromise from '../utils/APIPath';
import {
    getMD5Value
}from '../utils/NDMD5Util';
import AuthUtil from '../utils/AuthUtil'
import $ from 'jquery';


class AuthService extends BaseService {

    /**
     * 用户登录
     * @param user 用户信息
     * @returns {*} 登录后的信息
     */
    login(user) {

        let self = this;
        let _token = null;
        let _user = null;
        return this._getToken(user).then((token) => {
            _token = token;
            return self._getUserInfo(token);
        }).then((user) => {
            _user = user;
            return self._getRoleInfo(_token, _user)
        }).then((role) => {
            return {
                user_id: _token["user_id"],
                user_name: _user["user_name"],
                nick_name: _user["nick_name"],
                role: role.items,
                access_token: _token["access_token"],
                mac_key: _token["mac_key"],
                expires_at: _token["expires_at"]
            }
        });

    }

    _getToken(user) {
        let postData = JSON.stringify({
            login_name: user.username,
            password: getMD5Value(user.password)
        });
        let ajaxUnauthorized = this.ajaxUnauthorized;
        return APIPathPromise.then((APIPath) => {
            let url = APIPath.UC_HOST + '/tokens';
            return ajaxUnauthorized(url, 'POST', postData);
        });
    }

    _getUserInfo(token) {
        return APIPathPromise.then((APIPath) => {
            let realm = APIPath.REALM;
            let url = APIPath.UC_HOST + `/users/${token.user_id}?realm=${realm}`;
            let authPromise = this._makeAuthPromise(token, url);
            return this._getAjax(authPromise, url);
        });
    }

    _getRoleInfo(token, user) {
        return APIPathPromise.then((APIPath) => {
            let realm = APIPath.REALM;
            let url = APIPath.UC_HOST + `/users/${user.user_id}/roles?realm=${realm}`;
            let authPromise = this._makeAuthPromise(token, url);
            return this._getAjax(authPromise, url);
        });
    }


    _makeAuthPromise(token, url) {
        let _token = token["access_token"];
        let _mac_key = token["mac_key"];
        let method = "GET";
        let authPromise = AuthUtil.getAuthHeader(url, method, _token, _mac_key);
        return authPromise;
    }

    _getAjax(authPromise, url) {
        return authPromise.then((auth) => {
            return $.ajax({
                url: url,
                type: 'GET',
                headers: {
                    "Authorization": auth,
                    "Content-Type": "application/json; charset=UTF-8"
                },
                dataType: 'json'
            });
        });
    }


}

export default new AuthService();


