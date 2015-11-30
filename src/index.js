import 'babel-core/polyfill';
import React from 'react';
import { render } from 'react-dom';
import App from './containers/App';
import configureStore from './store/configureStore';

const store = configureStore();


if (typeof localStorage.expires_at !== 'undefined') {
    let expiresTime = (new Date(localStorage.expires_at)).getTime();
    if (Date.now() > expiresTime) {
        delete localStorage.user;
        delete localStorage.token;
        delete localStorage.mac_key;
        delete localStorage.expires_at;
    }
}

render(
    <App store={store}/>,
    document.getElementById('root')
);
