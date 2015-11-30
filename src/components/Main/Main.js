/**
 * 主界面
 */
import styles from './Main.css';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { pushState } from 'redux-router';
import Header from './Header';
import Footer from './Footer';
import Menu from './Menu';
import HiddenMenu from './HiddenMenu';
import { logout } from '../../actions/AuthAction'
import LoadingView from './LoadingView'

class Main extends Component {


    constructor(props) {
        super(props);
        this.state = {
            isShowCountMenus: true,
            isShowPushMenus: true,
            isShowImportMenus: true,
            isShowMenus: true,
            isUpdate: false
        }
    }

    componentDidMount() {
        this.props.redirectToMe();
    }

    componentWillUnmount() {

    }

    toggleMenus() {
        this.setState({
            isShowMenus: !this.state.isShowMenus
        })
    }

    togglePushMenus() {
        this.setState({
            isShowPushMenus: !this.state.isShowPushMenus
        })
    }

    toggleCountMenus() {
        this.setState({
            isShowCountMenus: !this.state.isShowCountMenus
        })
    }

    toggleImportMenus() {
        this.setState({
            isShowImportMenus: !this.state.isShowImportMenus
        })
    }


    render() {


        let headProps = {
            onLogout: this.props.onLogout,
            user: this.props.user
        }

        let menuProps = {
            isShowMenus: this.state.isShowMenus,
            isShowCountMenus: this.state.isShowCountMenus,
            isShowPushMenus: this.state.isShowPushMenus,
            isShowImportMenus: this.state.isShowImportMenus,
            toggleMenus: this.toggleMenus.bind(this),
            togglePushMenus: this.togglePushMenus.bind(this),
            toggleCountMenus: this.toggleCountMenus.bind(this),
            toggleImportMenus: this.toggleImportMenus.bind(this)
        }


        return (
            <div className={styles['main-container']+' clearfix'}>
                <Header {...headProps}/>
                <Menu {...menuProps}/>
                <HiddenMenu isShowMenus={this.state.isShowMenus} toggleMenus={this.toggleMenus.bind(this)}/>
                <div
                    className={(this.state.isShowMenus?styles['main-content']:styles['main-content-toggle'])+' fr'}>
                    {this.props.children}
                    <LoadingView/>
                </div>
                <Footer/>
            </div>
        );
    }

}

Main.propTypes = {};

function mapStateToProps(state) {
    return {
        user: state.auth.user
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onLogout: () => dispatch(logout()),
        redirectToMe: () => dispatch(pushState(null, '/question_count'))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Main);