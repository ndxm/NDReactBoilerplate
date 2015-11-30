/**
 * 题目统计
 */


import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import styles from './QuestionCountList.css';
import { loadQuestions } from '../../actions/QuestionCountAction'


export default class QuestionCountList extends Component {


    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        this.props.onLoadQuestions();
    }


    render() {

        let questions = this.props.questions.map((question, index) => {
            return (
                <div key={index} className='table-row clearfix'>
                    <div className={'table-col '+styles['col1'] }>{question.realm}</div>
                    <div className={'table-col '+styles['col2'] }>{question.subject}</div>
                    <div className={'table-col '+styles['col3'] }>{question.grade}</div>
                    <div className={'table-col '+styles['col4'] }>{question.semester}</div>
                    <div className={'table-col '+styles['col5'] }>{question.questionType}</div>
                    <div className={'table-col '+styles['col6'] }>{question.count}</div>
                </div>
            );
        });


        return (
            <div className="content">
                <div className={"location location_border"}>
                    <span className='location-name'>统计</span> >
                    <Link to='/question_count' className='location-name'>题目数量列表</Link>
                </div>
                <div className='table-header'>
                    <div className='table-header-row clearfix'>
                        <div className={'table-col '+styles['col1'] }>领域</div>
                        <div className={'table-col '+styles['col2'] }>学科</div>
                        <div className={'table-col '+styles['col3'] }>年级</div>
                        <div className={'table-col '+styles['col4'] }>学期</div>
                        <div className={'table-col '+styles['col5'] }>题型</div>
                        <div className={'table-col '+styles['col6'] }>数量</div>
                    </div>
                </div>
                <div className={' table-body bg-fff ' + styles['list-table-body']}>
                    {questions}
                </div>
            </div>
        )
    }

}

function mapStateToProps(state) {
    return {
        questions: state.questionCount.questions
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onLoadQuestions: () => dispatch(loadQuestions())
    }
}


export default  connect(mapStateToProps, mapDispatchToProps)(QuestionCountList);