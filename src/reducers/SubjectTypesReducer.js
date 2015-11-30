import { combineReducers } from 'redux';
import merge from 'lodash/object/merge';

import {GET_SUBJECT_TYPES_REQUEST,GET_SUBJECT_TYPES_SUCCESS,GET_SUBJECT_TYPES_FAIL} from '../actions/type/ActionTypes';

function subjectTypes(state = {types: [], error: null}, action) {

    switch (action.type) {

        case GET_SUBJECT_TYPES_REQUEST:
            return state;
        case GET_SUBJECT_TYPES_SUCCESS:
            let name,value,typesOptions=[];
            let types = action.data.items;
            for (let i = 0; i < types.length; i++) {
                name = types[i].name;
                value = types[i].value;
                typesOptions=typesOptions.concat({display: name, value: value});
             }
             types=typesOptions;
            return merge({}, state, {types});
        case GET_SUBJECT_TYPES_FAIL:
            return merge({}, state, {error: action.message});
        default:
            return state;

    }

}
export default subjectTypes;