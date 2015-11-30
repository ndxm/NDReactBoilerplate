import merge from 'lodash/object/merge';

import {QUESTION_COUNT_REQUEST,QUESTION_COUNT_SUCCESS,QUESTION_COUNT_FAILURE} from '../actions/type/ActionTypes';

function questionCount(state = {questions: [], error: null, fetching: false}, action) {

    switch (action.type) {

        case QUESTION_COUNT_REQUEST:
            return merge({}, state, {fetching: true});
        case QUESTION_COUNT_SUCCESS:
            let data = action.data;
            let questions = buildQuestions(data);
            return merge({}, state, {questions, fetching: false});
        case QUESTION_COUNT_FAILURE:
            return merge({}, state, {error: action.message, fetching: false});
        default:
            return state;

    }

}

//构建题目列表
function buildQuestions(data) {
    let questions = [];
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
        questions.push(question);
    }
    return questions;
}

export default questionCount;