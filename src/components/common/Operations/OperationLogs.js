import React from 'react';
import Styles from './OperationLogs.css';
import OperationLog from './OperationLog';
import Section from '../Section/Section';

var OperationLogs = React.createClass({

    propTypes: {
        logs: React.PropTypes.array
    },


    render: function () {
        return (
            <Section title='变更记录'>
                {
                    this.props.logs ?
                        this.props.logs.map((log, index)=> {
                            return <OperationLog key={index} item={log}/>
                        }) : null
                }
            </Section>
        )
    }
});

export default OperationLogs;