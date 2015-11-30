/**
 * 路由控制
 */

import React from 'react';
import { Router,Route,IndexRoute } from 'react-router';
import App from './containers/App';

import Login from './components/Login/Login'
import Main from './components/Main/Main';
import QuestionCountList from  './components/Counts/QuestionCountList';
import Subject from  './components/Subject/Subject';
import KnowledgeCountList from './components/Counts/KnowledgeCountList';
import Undeveloped from './components/Undevelop/Undeveloped'


/**
 * 必需登录
 * @param nextState
 * @param replaceState
 */
function requireAuth(nextState, replaceState) {
    let existToken = localStorage.token ? true : false;
    if (!existToken) {
        replaceState({nextPathname: nextState.location.pathname}, '/login');
    }
}

export default (
    <Router>
        <Route path="/login" component={Login}/>
        <Route path="/" component={Main} onEnter={requireAuth}>
            <IndexRoute component={QuestionCountList}/>
            <Route path="/question_count" component={QuestionCountList}/>
            <Route path="/question_list" component={Subject}/>
            <Route path="/knowledge_count" component={KnowledgeCountList}/>
            <Route path="/undeveloped" component={Undeveloped}/>
        </Route>
    </Router>
);