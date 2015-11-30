import { combineReducers } from 'redux';
import merge from 'lodash/object/merge';

import {GET_SUBJECT_AREAS_REQUEST,GET_SUBJECT_AREAS_SUCCESS,GET_SUBJECT_AREAS_FAIL} from '../actions/type/ActionTypes';

function subjectAreas(state = {areas: [], error: null}, action) {

    switch (action.type) {

        case GET_SUBJECT_AREAS_REQUEST:
            return state;
        case GET_SUBJECT_AREAS_SUCCESS:
            let name,id,areasOptions=[];
            let areas = action.data.items;
            for (let i = 0; i < areas.length; i++) {
                name = areas[i].name;
                id = areas[i].id;
                areasOptions=areasOptions.concat({display: name, value: id});
             }
             areas=areasOptions;
            return merge({}, state, {areas});
        case GET_SUBJECT_AREAS_FAIL:
            return merge({}, state, {error: action.message});
        default:
            return state;

    }

}
export default subjectAreas;