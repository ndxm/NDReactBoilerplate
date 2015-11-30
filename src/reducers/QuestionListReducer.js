import { combineReducers } from 'redux';
import merge from 'lodash/object/merge';

import {POST_QUESTION_LIST_REQUEST,POST_QUESTION_LIST_SUCCESS,POST_QUESTION_LIST_FAIL} from '../actions/type/ActionTypes';

function questionsList(state = {questions: [], error: null}, action) {

    switch (action.type) {

        case POST_QUESTION_LIST_REQUEST:
            return state;
        case POST_QUESTION_LIST_SUCCESS:
            let questions = action.data.content;
            return merge({}, state, {questions});
        case POST_QUESTION_LIST_FAIL:
            return merge({}, state, {error: action.message});
        default:
            return state;

    }

}
export default questionsList;