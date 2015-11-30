import { combineReducers } from 'redux';
import merge from 'lodash/object/merge';

import {GET_SUBJECT_LIST_REQUEST,GET_SUBJECT_LIST_SUCCESS,GET_SUBJECT_LIST_FAIL} from '../actions/type/ActionTypes';

function subjectList(state = {subjects: [], error: null}, action) {

    switch (action.type) {

        case GET_SUBJECT_LIST_REQUEST:
            return state;
        case GET_SUBJECT_LIST_SUCCESS:
            let name,id,subjectsOptions=[];
            let subjects = action.data.items;
            for (let i = 0; i < subjects.length; i++) {
                name = subjects[i].subject_label;
                id = subjects[i].id;
                subjectsOptions=subjectsOptions.concat({display: name, value: id});
             }
             subjects=subjectsOptions;
            return merge({}, state, {subjects});
        case GET_SUBJECT_LIST_FAIL:
            return merge({}, state, {error: action.message});
        default:
            return state;

    }

}
export default subjectList;