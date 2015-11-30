/**
 * 学科列表
 */


import {POST_QUESTION_LIST_REQUEST,POST_QUESTION_LIST_SUCCESS,POST_QUESTION_LIST_FAIL} from './type/ActionTypes';
import { pushState } from 'redux-router';
import ExamService from '../services/ExamService';
import RequestExceptionUtil from '../utils/RequestExceptionUtil';


function loadQuestionListRequest() {
    return {
        type: POST_QUESTION_LIST_REQUEST
    }
}


function loadQuestionListSuccess(res) {
    return {
        type: POST_QUESTION_LIST_SUCCESS,
        data: res
    }
}

function loadQuestionListFail(message) {
    return {
        type: POST_QUESTION_LIST_FAIL,
        message: message
    }
}


export function loadQuestionList(data) {
    return function (dispatch) {

        dispatch(loadQuestionListRequest());

        return ExamService.loadQuestionList(data).then((res) => {
            dispatch(loadQuestionListSuccess(res));
        }).catch((err) => {
            let msg = RequestExceptionUtil.getError(err, '加载数据失败');
            dispatch(loadSubjectTypesFail(msg));
        }).finally(() => {

        });


    }
}
