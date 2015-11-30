import React from 'react';
import { connect } from 'react-redux';
import Router,{ Link } from 'react-router';
import styles from './subjectFilterBar.css';
import SearchTag from '../common/SearchTag/SearchTag.js';
import BubbleBox from '../common/BubbleBox/BubbleBox.js';
import { loadSubjectAreas } from '../../actions/SubjectAreasAction';
import { loadSubjectList } from '../../actions/SubjectListAction';
import { loadSubjectTypes } from '../../actions/SubjectTypesAction';
import { loadQuestionList } from '../../actions/QuestionListAction';
import $ from 'jquery';

class SubjectFilterBar extends React.Component {

    //构造并初始化
    constructor(props) {
        super(props);
        this.state = {
            searchShows : {},
            searcheds   : [],
            query : {}
        }
    }

    //装载组件
    componentDidMount() {
       $("#root").bind('click', this.handleClick);
    }

    //卸载组件
    componentWillUnmount(){
        $("#root").unbind('click', this.handleClick);
    }

    //点击事件
    handleClick(e){
        let $slide = $(e.target).parents('.bubble-box');
        if($slide.length==0) {
            this.setState({
                searchShows : {}
            })
        }
    }

    //显示搜索
    showSearch(key, value, e){
        e.nativeEvent.stopImmediatePropagation();
        this.state.searchShows ={};
        this.state.searchShows[key] = value;
        this.setState({
            searchShows : this.state.searchShows
        })
    }

    //隐藏搜索
    onHideSearch(){
        this.setState({
            searchShows : {}
        })
    }

    //移除搜索内容
    onRemoveTag(refValue){
        var new_searcheds = [];
        for (var i = 0; i < this.state.searcheds.length; i++) {
            if (this.state.searcheds[i].refValue != refValue) {
                new_searcheds.push(this.state.searcheds[i]);
            }
        }
        this.state.searcheds = new_searcheds;
        this.onSearch();
    }

    //添加搜索内容
    onAddTag(refValue, keyName, showValue, value){
        var obj = {
            refValue: refValue,
            keyName: keyName,
            showValue: showValue,
            value: value
        }
        var hasCount = 0;
        for (var i = 0; i < this.state.searcheds.length; i++) {
            if (this.state.searcheds[i].refValue == refValue) {
                hasCount++;
                this.state.searcheds[i] = obj;
            }
        }
        if (hasCount == 0) {
            this.state.searcheds.push(obj);
        }
        this.onSearch();
    }

    //搜索
    onSearch(){

        this.state.query={};
        for(let i = 0;i < this.state.searcheds.length; i++){
            let item =this.state.searcheds[i];
            this.state.query[item.refValue] = item.value;
        }
        this.state.searchShows={};
        let data={
            "tag_list":["cn","K12","语文","8年级","下册"],
            "questions_type":1,
            "current_page":0,
            "page_size":10
        }
        this.props.loadSearch(data);
    }

    render() {
       let searchShows = this.state.searchShows;
        return (
            <div className={styles['search-panel']}>
                <div className={styles['search-bubblebox']+' bubble-box'}>
                    <a href='javascript:;'
                       className={styles['search-bubble-item']+' '+(searchShows.is_subjectAreas?styles['active']:'')}
                       onClick={this.showSearch.bind(this,'is_subjectAreas',!searchShows.is_subjectAreas)}>学科领域</a>
                    {searchShows.is_subjectAreas ? (
                        <BubbleBox refValue='subjectAreas' items={this.props.areasOptions} keyName='学科领域'
                                   confirmCallback={this.onAddTag.bind(this)}></BubbleBox>
                    ) : null}
                </div>

                <div className={styles['search-bubblebox']+' bubble-box'}>
                    <a href='javascript:;'
                       className={styles['search-bubble-item']+' '+(searchShows.is_projectCategory?styles['active']:'')}
                       onClick={this.showSearch.bind(this,'is_subjectList',!searchShows.is_subjectList)}>学科列表</a>
                    {searchShows.is_subjectList ? (
                        <BubbleBox refValue='subjectList' items={this.props.subjectsOptions} keyName='学科列表'
                                   confirmCallback={this.onAddTag.bind(this)}></BubbleBox>
                    ) : null}
                </div>

                <div className={styles['search-bubblebox']+' bubble-box'}>
                    <a href='javascript:;'
                       className={styles['search-bubble-item']+' '+(searchShows.is_subjectTypes?styles['active']:'')}
                       onClick={this.showSearch.bind(this,'is_subjectTypes',!searchShows.is_subjectTypes)}>题型列表</a>
                    {searchShows.is_subjectTypes ? (
                        <BubbleBox refValue='subjectTypes' items={this.props.typesOptions} keyName='题型列表'
                                   confirmCallback={this.onAddTag.bind(this)}></BubbleBox>
                    ) : null}
                </div>
                {
                    this.props.questions.length>0?(
                            <div>   
                                 {this.props.questions.map((question,index)=>{
                                        <ul key={index}>
                                            <li>{question.ko_uri}</li>
                                            <li>{question.question_type}</li>
                                            <li>{question.question}</li>
                                            <li>{question.scenario}</li>
                                            <li>{question.extension}</li>
                                        </ul>
                                })}

                            </div>
                        ):null
                }
                
                 {
                    this.state.searcheds.length > 0 ? (
                        <div className={styles['searched']}>
                            <span className={styles['searched-name']}>筛选条件：</span>
                            {this.state.searcheds.map( (item, index) =>{
                                return (
                                    <SearchTag key={index} indexValue={index} keyName={item.keyName}
                                               value={item.showValue} refValue={item.refValue}
                                               removeCallback={this.onRemoveTag.bind(this)}></SearchTag>
                                )
                            }, this)}
                        </div>
                    ) : null
                }
                
             </div>
        );
    }

}


function mapStateToProps(state) {
    return {
        areasOptions: state.subjectAreas.areas,
        subjectsOptions: state.subjectList.subjects,
        typesOptions: state.subjectTypes.types,
        questions: state.questionList.questions
    }
}

function mapDispatchToProps(dispatch) {
    return {
        loadSubjectAreas: () => dispatch(loadSubjectAreas()),
        loadSubjectList: () => dispatch(loadSubjectList()),
        loadSubjectTypes: () => dispatch(loadSubjectTypes()),
        loadSearch: (data)=> dispatch(loadQuestionList(data))
    }
}


export default  connect(mapStateToProps, mapDispatchToProps)(SubjectFilterBar);