/**
 * 学科领域
 */


import {GET_SUBJECT_AREAS_REQUEST,GET_SUBJECT_AREAS_SUCCESS,GET_SUBJECT_AREAS_FAIL} from './type/ActionTypes';
import { pushState } from 'redux-router';
import ExamService from '../services/ExamService';
import RequestExceptionUtil from '../utils/RequestExceptionUtil';


function loadSubjectAreasRequest() {
    return {
        type: GET_SUBJECT_AREAS_REQUEST
    }
}


function loadSubjectAreasSuccess(res) {
    return {
        type: GET_SUBJECT_AREAS_SUCCESS,
        data: res
    }
}

function loadSubjectAreasFail(message) {
    return {
        type: GET_SUBJECT_AREAS_FAIL,
        message: message
    }
}

/**
 * 加载领域列表
 * @returns {Function}
 */
export function loadSubjectAreas() {
    return function (dispatch) {

        dispatch(loadSubjectAreasRequest());

        return ExamService.loadSubjectAreas().then((res) => {
            dispatch(loadSubjectAreasSuccess(res));
        }).catch((err) => {
            let msg = RequestExceptionUtil.getError(err, '加载数据失败');
            dispatch(loadSubjectAreasFail(msg));
        }).finally(() => {

        });


    }
}