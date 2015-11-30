import styles from './Footer.css';
import React, { Component, PropTypes } from 'react';

export default class Footer extends Component {


    constructor(props) {
        super(props);
    }


    render() {
        return (
            <footer className={styles.footer}>
                <div>COPYRIGHT 1999-2015 X 99.COM ALL RIGHTS RESERVED</div>
                <div>福建网龙计算机网络信息技术有限公司</div>
            </footer>
        )
    }

}