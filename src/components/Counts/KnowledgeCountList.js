/**
 * 知识点统计
 */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import styles from './KnowledgeCountList.css';
import { loadKnowledgeCounts } from '../../actions/KnowledgeCountAction'


export default class KnowledgeCountList extends Component {


    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        this.props.onLoadKnowledgeCounts();
    }

    render() {


        let knowledge = this.props.knowledge.map((item, index) => {
            return (
                <div key={index} className='table-row clearfix'>
                    <div className={'table-col '+styles['col1'] }>{item.realm}</div>
                    <div className={'table-col '+styles['col2'] }>{item.subject}</div>
                    <div className={'table-col '+styles['col3'] }>{item.grade}</div>
                    <div className={'table-col '+styles['col4'] }>{item.semester}</div>
                    <div className={'table-col '+styles['col6'] }>{item.count}</div>
                </div>
            );
        });

        return (
            <div className="content">
                <div className={"location location_border"}>
                    <span className='location-name'>统计</span> >
                    <Link to='/knowledge_count' className='location-name'>知识点数量列表</Link>
                </div>
                <div className='table-header'>
                    <div className='table-header-row clearfix'>
                        <div className={'table-col '+styles['col1'] }>领域</div>
                        <div className={'table-col '+styles['col2'] }>学科</div>
                        <div className={'table-col '+styles['col3'] }>年级</div>
                        <div className={'table-col '+styles['col4'] }>学期</div>
                        <div className={'table-col '+styles['col5'] }>数量</div>
                    </div>
                </div>
                <div className={styles['list-table-body']+' table-body bg-fff'}>
                    {knowledge}
                </div>
            </div>
        )

    }


}

function mapStateToProps(state) {
    return {
        knowledge: state.knowledgeCount.knowledge
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onLoadKnowledgeCounts: () => dispatch(loadKnowledgeCounts())
    }
}


export default  connect(mapStateToProps, mapDispatchToProps)(KnowledgeCountList);