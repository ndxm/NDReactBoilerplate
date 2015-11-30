/**
 * 头部信息
 */
import styles from './Header.css';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { pushState } from 'redux-router';
import DropdownBox from '../common/DropdownBox/DropdownBox';
import Confirm from '../common/Confirm/Confirm';


export default class Header extends Component {


    constructor(props) {
        super(props);
        this.state = {
            logoutConfirm: null
        }
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    logout() {
        this.setState({
            logoutConfirm: (
                <Confirm title='确认退出?' message='确认退出当前账户吗？' cancelCallback={this.cancelLogout.bind(this)}
                         confirmCallback={this.props.onLogout}/>
            )
        });
    }

    cancelLogout() {
        this.setState({
            logoutConfirm: null
        })
    }


    render() {

        let displayName = '';
        if (!!this.props.user) {
            displayName = `${this.props.user.nick_name}(${this.props.user.user_id})`
        }
        let dropdownStyle = {
            //backgroundColor : 'rgba(57, 191, 255, 0.3)'
        }

        return (
            <div className={styles['header']}>
                <div className={styles['header-inner']}>
                    <span className={styles['title']}>智能出题管理后台</span>
                    <div className="fr">
                        <DropdownBox title={displayName} height='59px' width='160px' style={ dropdownStyle}>
                            <a href='javascript:;' className={styles['dropdown-item']} onClick={this.logout.bind(this)}>
                                <i className={"icon-off "+styles['dropdown-icon']}></i>
                                <span className={styles['dropdown-title']}>退出</span>
                            </a>
                        </DropdownBox>
                    </div>
                </div>
                {this.state.logoutConfirm}
            </div>
        );
    }

}

Header.propTypes = {
    onLogout: PropTypes.func.isRequired
};
