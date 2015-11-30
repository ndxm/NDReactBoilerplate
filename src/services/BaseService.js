/**
 * 基础的Base类
 */

import $ from "jquery";
import AuthUtil from "../utils/AuthUtil";

export default class {

    /**
     * 头部带有验证的GET请求
     * @param url URL地址
     * @returns {Object} 远程请求结果
     */
    get(url) {
        return this.ajax(url, "GET", null);
    }

    /**
     * 头部带有验证的POST请求
     * @param url URL地址
     * @param data 请求数据
     * @returns {Object} 远程请求结果
     */
    post(url, data) {
        return this.ajax(url, "POST", data);
    }

    /**
     * 头部带有验证的PUT请求
     * @param url URL地址
     * @param data 请求数据
     * @returns {Object} 远程请求结果
     */
    put(url, data) {
        return this.ajax(url, "PUT", data);
    }

    /**
     * 头部带有验证的DELETE请求
     * @param url URL地址
     * @param data 请求数据
     * @returns {Object} 远程请求结果
     */
    delete(url, data) {
        return this.ajax(url, "DELETE", data);
    }


    /**
     * 头部带有验证的ajax请求
     * @param  {string} url    URL地址
     * @param  {string} method HTTP请求方法
     * @param  {json} data  请求数据
     * @return {object} 远程请求结果
     */
    ajax(url, method, data) {
        method = method.toUpperCase();
        var authPromise = AuthUtil.getAuthHeader(url, method);
        return authPromise.then((auth) => {
            return $.ajax({
                url: url,
                type: method,
                data: data,
                headers: {
                    "Authorization": auth,
                    "Content-Type": "application/json; charset=UTF-8"
                },
                dataType: 'json'
            });
        });
    }

    /**
     * 头部不带有验证的ajax请求
     * @param  {string} url    URL地址
     * @param  {string} method HTTP请求方法
     * @param  {json} data  请求数据
     * @return {object} 远程请求结果
     */
    ajaxUnauthorized(url, method, data) {
        return $.ajax({
            url: url,
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            },
            dataType: 'json',
            type: method.toUpperCase(),
            data: data
        });
    }

    /**
     * 不带头部的ajax请求
     * @param  {string} url    URL地址
     * @param  {string} method HTTP请求方法
     * @param  {json} data  请求数据
     * @return {object} 远程请求结果
     */
    ajaxWithoutHeader(url, method, data) {
        return $.ajax({
            url: url,
            type: method,
            data: data,
            cache: false,
            contentType: false,
            processData: false
        });
    }

    /**
     * 文件上传
     * @param  {string} url   URL地址
     * @param  {string} method HTTP请求方法
     * @param  {json} data  请求数据
     * @return {object} 远程请求结果
     */
    postFile(url, method, data) {
        method = method.toUpperCase();
        var authPromise = AuthUtil.getAuthHeader(url, method);
        return authPromise.then((auth) => {
            return $.ajax({
                type: method,
                url: url,
                headers: {
                    "Authorization": auth
                },
                data: data,
                cache: false,
                contentType: false,
                processData: false
            });
        })
    }

}

