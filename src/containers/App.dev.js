/**
 * 开发环境下
 */
import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import { ReduxRouter } from 'redux-router';
import DevTools from './DevTools';

export default class Root extends Component {

    render() {
        const { store } = this.props;
        let style = {
            height: '100%',
            width: '100%'
        }
        return (
            <Provider store={store}>
                <div style={style}>
                    <ReduxRouter />
                    <DevTools />
                </div>
            </Provider>
        );
    }
}

Root.propTypes = {
    store: PropTypes.object.isRequired
};


