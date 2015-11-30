/**
 * 未开发功能模板
 */
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import styles from './Undeveloped.css';

export default class Undeveloped extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
    }

    render() {

        return (
            <div className="content">
                <div className={"location location_border"}>
                    <span className='location-name'>XX</span> >
                    <Link to='/knowledge_count' className='location-name'>XXX</Link>
                </div>
                <div className={styles['main-head']}>
                    <h2>
                        Something awesome is coming soon
                    </h2>
                    <p>
                        We are building something very cool. Stay tuned and be patient.
                    </p>
                </div>
            </div>
        )

    }


}
Undeveloped.propTypes = {}