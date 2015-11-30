/**
 * 菜单
 */
import styles from './Menu.css';
import React, { Component, PropTypes } from 'react';
import {Link} from 'react-router';

export  default class Menu extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    render() {
        return (
            <div className={styles['menus']+' fl '+(this.props.isShowMenus?'':'hide')}>
                <a href="javascript:" className={styles['close-btn']} onClick={this.props.toggleMenus}>
                    <i className="icon-angle-left"/>
                </a>

                <div className={styles['menus-panel']+' '+styles['menus-panel-first']}>
                    <div className={styles['menus-panel-item']+' menus-panel-item'}>
                        <a href='javascript:' className={styles['menu-name']}
                           onClick={this.props.toggleCountMenus}>统计</a>
                        <ul className={styles['menus-list']+' '+(this.props.isShowCountMenus?'':styles['menus-hide'])}>
                            <li className="">
                                <Link to='/question_count' activeClassName={styles['active']}>
                                    <i className='icon-list'/> 题目数量列表
                                </Link>
                            </li>
                            <li className="">
                                <Link to='/knowledge_count' activeClassName={styles['active']}>
                                    <i className='icon-file-text'/> 知识点数量列表
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className={styles['menus-panel-item']+' menus-panel-item'}>
                        <a href='javascript:' className={styles['menu-name']}
                           onClick={this.props.toggleImportMenus}>导入</a>
                        <ul className={styles['menus-list']+' '+(this.props.isShowImportMenus?'':styles['menus-hide'])}>
                            <li className="">
                                <Link to='/undeveloped' activeClassName={styles['active']}>
                                    <i className='icon-tasks'/> Excel文件上传
                                </Link>
                            </li>
                            <li className="">
                                <Link to='/undeveloped' activeClassName={styles['active']}>
                                    <i className='icon-bar-chart'/> 上传结果列表
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className={styles['menus-panel-item']+' menus-panel-item'}>
                        <a href='javascript:' className={styles['menu-name']}
                           onClick={this.props.togglePushMenus}>题目推送</a>
                        <ul className={styles['menus-list']+' '+(this.props.isShowPushMenus?'':styles['menus-hide'])}>
                            <li className="">
                                <Link to='/question_list' activeClassName={styles['active']}>
                                    <i className='icon-th'/>题目列表
                                </Link>
                            </li>
                        </ul>
                    </div>

                </div>
            </div>
        );
    }

}

Menu.propTypes = {
    userName: PropTypes.string,
    isShowMenus: PropTypes.bool.isRequired,
    isShowCountMenus: PropTypes.bool.isRequired,
    isShowPushMenus: PropTypes.bool.isRequired,
    isShowImportMenus: PropTypes.bool.isRequired,
    toggleMenus: PropTypes.func.isRequired,
    toggleCountMenus: PropTypes.func.isRequired,
    togglePushMenus: PropTypes.func.isRequired,
    toggleImportMenus: PropTypes.func.isRequired

};