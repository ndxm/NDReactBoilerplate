import styles from './Loading.css'

import React from 'react'

export default React.createClass({
    propTypes: {
        isLoading: React.PropTypes.bool.isRequired
    },
    render() {
        return (
            <div className={ this.props.isLoading === true ? styles.show : styles.hide}></div>
        )
    }
})
