/**
 * 隐藏式菜单
 */
import styles from './Menu.css';
import React, { Component, PropTypes } from 'react';
import {Link} from 'react-router';

export default class HiddenMenu extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    render() {
        return (
            <div className={styles['menus-toggle']+' fl '+(this.props.isShowMenus?'hide':'')}>
                <Link to='/question_count' activeClassName={styles['toggle-menu-item']+' '+styles['active']}
                      className={styles['toggle-menu-item']+' '}>
                    <i className={'icon-list '+styles['toggle-menu-icon']}/>
                    <div className={styles['toggle-menu-name']}>
                        <i className={"icon-caret-left "+styles['toggle-menu-name-icon']}/>题目数量列表
                    </div>
                </Link>

                <Link to='/knowledge_count' activeClassName={styles['toggle-menu-item']+' '+styles['active']}
                      className={styles['toggle-menu-item']+' '}>
                    <i className={'icon-file-text '+styles['toggle-menu-icon']}/>
                    <div className={styles['toggle-menu-name']}>
                        <i className={"icon-caret-left "+styles['toggle-menu-name-icon']}/>知识点数量列表
                    </div>
                </Link>

                <Link to='/undeveloped' activeClassName={styles['toggle-menu-item']+' '+styles['active']}
                      className={styles['toggle-menu-item']+' '}>
                    <i className={'icon-tasks '+styles['toggle-menu-icon']}/>
                    <div className={styles['toggle-menu-name']}>
                        <i className={"icon-caret-left "+styles['toggle-menu-name-icon']}/>Excel文件上传
                    </div>
                </Link>

                <Link to='/undeveloped' activeClassName={styles['toggle-menu-item']+' '+styles['active']}
                      className={styles['toggle-menu-item']+' '}>
                    <i className={'icon-bar-chart '+styles['toggle-menu-icon']}/>
                    <div className={styles['toggle-menu-name']}>
                        <i className={"icon-caret-left "+styles['toggle-menu-name-icon']}/>上传结果列表
                    </div>
                </Link>

                <Link to='/question_list' activeClassName={styles['toggle-menu-item']+' '+styles['active']}
                      className={styles['toggle-menu-item']+' '}>
                    <i className={'icon-th '+styles['toggle-menu-icon']}/>
                    <div className={styles['toggle-menu-name']}>
                        <i className={"icon-caret-left "+styles['toggle-menu-name-icon']}/>题目列表
                    </div>
                </Link>

                <a href="javascript:" className={styles['close-btn']} onClick={this.props.toggleMenus}>
                    <i className="icon-angle-right"/>
                </a>
            </div>
        )

    }


}

HiddenMenu.propTypes = {
    isShowMenus: PropTypes.bool.isRequired,
    toggleMenus: PropTypes.func.isRequired
}
