import React from 'react';
import { connect } from 'react-redux';
import Router,{ Link } from 'react-router';
import styles from './subject.css';
import { loadSubjectAreas } from '../../actions/SubjectAreasAction';
import { loadSubjectList } from '../../actions/SubjectListAction';
import { loadSubjectTypes } from '../../actions/SubjectTypesAction';
import SubjectFilterBar from './SubjectFilterBar';

class Subject extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
       this.props.loadSubjectAreas();
       this.props.loadSubjectList();
       this.props.loadSubjectTypes();
    }

    render() {
        return (
            <div className="content">
                <div className="location">
                    <Link to='/' className='location-name'>统计</Link> > <span
                    className='location-name'>题目数量列表</span>
                </div>
                <SubjectFilterBar/>
            </div>
        );
    }

}


function mapStateToProps(state) {
    return {
        areasOptions: state.subjectAreas.areas,
        subjectsOptions: state.subjectList.subjects,
        typesOptions: state.subjectTypes.types
    }
}

function mapDispatchToProps(dispatch) {
    return {
        loadSubjectAreas: () => dispatch(loadSubjectAreas()),
        loadSubjectList: () => dispatch(loadSubjectList()),
        loadSubjectTypes: () => dispatch(loadSubjectTypes())
    }
}


export default  connect(mapStateToProps, mapDispatchToProps)(Subject);