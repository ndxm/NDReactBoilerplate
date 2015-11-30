/**
 * 学科列表
 */


import {GET_SUBJECT_TYPES_REQUEST,GET_SUBJECT_TYPES_SUCCESS,GET_SUBJECT_TYPES_FAIL} from './type/ActionTypes';
import { pushState } from 'redux-router';
import ExamService from '../services/ExamService';
import RequestExceptionUtil from '../utils/RequestExceptionUtil';


function loadSubjectTypesRequest() {
    return {
        type: GET_SUBJECT_TYPES_REQUEST
    }
}


function loadSubjectTypesSuccess(res) {
    return {
        type: GET_SUBJECT_TYPES_SUCCESS,
        data: res
    }
}

function loadSubjectTypesFail(message) {
    return {
        type: GET_SUBJECT_TYPES_FAIL,
        message: message
    }
}

/**
 * 加载题型列表
 * @returns {Function}
 */
export function loadSubjectTypes() {
    return function (dispatch) {

        dispatch(loadSubjectTypesRequest());

        return ExamService.loadSubjectTypes().then((res) => {
            dispatch(loadSubjectTypesSuccess(res));
        }).catch((err) => {
            let msg = RequestExceptionUtil.getError(err, '加载数据失败');
            dispatch(loadSubjectTypesFail(msg));
        }).finally(() => {

        });


    }
}