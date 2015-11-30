import React from 'react';
import Styles from './Section.css';

var Section = React.createClass({

    propTypes: {
        title: React.PropTypes.string
    },


    render: function () {
        return (
            <div className={Styles['section']}>
                <div className={Styles['title']}>{this.props.title}</div>
                <div className={Styles['content']}>
                    {this.props.children}
                </div>
            </div>
        )
    }
});

export default Section;