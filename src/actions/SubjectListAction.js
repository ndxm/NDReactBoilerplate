/**
 * 学科列表
 */


import {GET_SUBJECT_LIST_REQUEST,GET_SUBJECT_LIST_SUCCESS,GET_SUBJECT_LIST_FAIL} from './type/ActionTypes';
import { pushState } from 'redux-router';
import ExamService from '../services/ExamService';
import RequestExceptionUtil from '../utils/RequestExceptionUtil';


function loadSubjectListRequest() {
    return {
        type: GET_SUBJECT_LIST_REQUEST
    }
}


function loadSubjectListSuccess(res) {
    return {
        type: GET_SUBJECT_LIST_SUCCESS,
        data: res
    }
}

function loadSubjectListFail(message) {
    return {
        type: GET_SUBJECT_LIST_FAIL,
        message: message
    }
}

/**
 * 加载学科列表
 * @returns {Function}
 */
export function loadSubjectList() {
    return function (dispatch) {

        dispatch(loadSubjectListRequest());

        return ExamService.loadSubjectList().then((res) => {
            dispatch(loadSubjectListSuccess(res));
        }).catch((err) => {
            let msg = RequestExceptionUtil.getError(err, '加载数据失败');
            dispatch(loadSubjectListFail(msg));
        }).finally(() => {

        });


    }
}