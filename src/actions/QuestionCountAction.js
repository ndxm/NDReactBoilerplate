/**
 * 题目统计
 */


import {QUESTION_COUNT_REQUEST,QUESTION_COUNT_SUCCESS,QUESTION_COUNT_FAILURE} from './type/ActionTypes';
import { pushState } from 'redux-router';
import QuestionCountService from '../services/QuestionCountService';
import RequestExceptionUtil from '../utils/RequestExceptionUtil';


function loadQuestionsRequest() {
    return {
        type: QUESTION_COUNT_REQUEST
    }
}


function loadQuestionsSuccess(res) {
    return {
        type: QUESTION_COUNT_SUCCESS,
        data: res
    }
}

function loadQuestionsFailure(message) {
    return {
        type: QUESTION_COUNT_FAILURE,
        message: message
    }
}

/**
 * 加载题目数量列表
 * @returns {Function}
 */
export function loadQuestions() {
    return function (dispatch) {

        dispatch(loadQuestionsRequest());

        return QuestionCountService.loadQuestions().then((res) => {
            dispatch(loadQuestionsSuccess(res));
        }).catch((err) => {
            let msg = RequestExceptionUtil.getError(err, '加载数据失败');
            dispatch(loadQuestionsFailure(msg));
        }).finally(() => {

        });


    }
}