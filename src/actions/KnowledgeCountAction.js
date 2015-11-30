/**
 * 题目统计
 */


import {KNOWLEDGE_COUNT_REQUEST,KNOWLEDGE_COUNT_SUCCESS,KNOWLEDGE_COUNT_FAILURE} from './type/ActionTypes';
import { pushState } from 'redux-router';
import KnowledgeCountService from '../services/KnowledgeCountService';
import RequestExceptionUtil from '../utils/RequestExceptionUtil';


function loadKnowledgeRequest() {
    return {
        type: KNOWLEDGE_COUNT_REQUEST
    }
}


function loadKnowledgeSuccess(res) {
    return {
        type: KNOWLEDGE_COUNT_SUCCESS,
        data: res
    }
}

function loadKnowledgeFailure(message) {
    return {
        type: KNOWLEDGE_COUNT_FAILURE,
        message: message
    }
}

/**
 * 加载知识点数量
 * @returns {Function}
 */
export function loadKnowledgeCounts() {
    return function (dispatch) {

        dispatch(loadKnowledgeRequest());

        return KnowledgeCountService.loadKnowledgeCounts().then((res) => {
            dispatch(loadKnowledgeSuccess(res));
        }).catch((err) => {
            let msg = RequestExceptionUtil.getError(err, '加载数据失败');
            dispatch(loadKnowledgeFailure(msg));
        }).finally(() => {

        });


    }
}