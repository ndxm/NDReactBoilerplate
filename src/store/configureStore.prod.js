/**
 * 生产环境下的store配置
 */
import { createStore, applyMiddleware, compose } from 'redux';
import { reduxReactRouter } from 'redux-router';
import createHistory from 'history/lib/createHashHistory';
import routes from '../routes';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

const finalCreateStore = compose(
    applyMiddleware(thunk),
    reduxReactRouter({routes, createHistory})
)(createStore);

export default function configureStore(initialState) {
    return finalCreateStore(rootReducer, initialState);
}


