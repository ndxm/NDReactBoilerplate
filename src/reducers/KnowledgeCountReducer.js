import merge from 'lodash/object/merge';

import {KNOWLEDGE_COUNT_REQUEST,KNOWLEDGE_COUNT_SUCCESS,KNOWLEDGE_COUNT_FAILURE} from '../actions/type/ActionTypes';

function knowledgeCount(state = {knowledge: [], error: null, fetching: false}, action) {

    switch (action.type) {

        case KNOWLEDGE_COUNT_REQUEST:
            return merge({}, state, {fetching: true});
        case KNOWLEDGE_COUNT_SUCCESS:
            let data = action.data;
            let knowledge = buildKnowLedge(data);
            return merge({}, state, {knowledge, fetching: false});
        case KNOWLEDGE_COUNT_FAILURE:
            return merge({}, state, {error: action.message, fetching: false});
        default:
            return state;

    }

}

//创建知识列表
function buildKnowLedge(data) {
    let knowledge = [];
    for (let i = 0; i < data.length; i++) {
        let count = data[i].count;
        let item = data[i].key;
        let question = {
            count: count,
            realm: item[0],
            subject: item[1],
            grade: item[2],
            semester: item[3],
            questionType: item[4]
        }
        knowledge.push(question);
    }
    return knowledge;
}
export default knowledgeCount;