import merge from 'lodash/object/merge';

import {LOGIN_REQUEST,LOGIN_SUCCESS,LOGIN_FAILED} from '../actions/type/ActionTypes';
import {LOGOUT_SUCCESS} from '../actions/type/ActionTypes';


let initAuthState = {
    user: localStorage.user ? JSON.parse(localStorage.user) : null,
    mac_key: localStorage.mac_key || null,
    token: localStorage.token || null,
    loginErr: null
}

function auth(state = initAuthState, action) {

    switch (action.type) {
        case LOGIN_REQUEST:
            return state;
        case LOGIN_SUCCESS:
            let user = {
                user_id: action.res.user_id,
                nick_name: action.res.nick_name,
                user_name: action.res.user_name,
                role: action.res.role
            };
            let mac_key = action.res.mac_key;
            let token = action.res.access_token;
            return merge({}, state, {user, mac_key, token});
        case LOGIN_FAILED:
            return merge({}, state, {loginErr: action.message});
        case LOGOUT_SUCCESS:
            return merge({}, state, {user: null, mac_key: null, token: null, avatar: null, loginErr: null});
        default:
            return state;
    }

}

export default auth;