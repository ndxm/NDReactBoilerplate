import React from 'react';
import Styles from './Tab.css';
import { Link,History } from 'react-router';
var createHistory = History.createHistory;
let Tab = React.createClass({
    getInitialState(){
        return {
            selectedIndex : -1
        }
    },
    componentWillReceiveProps(nextProps){
        if(this.props.children!==nextProps.children) {
            nextProps.children.map(function (itemChild, index) {
                if (itemChild.props.isSelected) {
                    this.setState({
                        selectedIndex: index
                    })
                }
            }, this);
        }
    },
    componentDidMount(){
        this.props.children.map(function (itemChild, index){
            if (itemChild.props.isSelected) {
                this.setState({
                    selectedIndex : index
                })
            }
        },this);
    },
    onSelectTab(item,index, e){
        if (item.props.isDisable) {
            e.preventDefault();
            return;
        }
        if (item.props.callback) {
            item.props.callback();
        }


        this.setState({
            selectedIndex : index
        })
    },
    render(){

        let tabElements = this.props.children.map(function (itemChild, index) {

            let className = '';
            if(index == this.state.selectedIndex){
                className = Styles['active'];
            }

            let disabledClassName = itemChild.props.isDisable ? Styles["disabled"] : "";

            //判断是否是连接
            if (itemChild.props.isLink) {
                var location = window.location.hash;
                var link_classname ='';
                if(location.indexOf(itemChild.props.linkUrl)>-1){
                    link_classname = Styles['active'];
                }

                return (
                    <Link key={index} to={itemChild.props.linkUrl} id={itemChild.props.id} className={disabledClassName+' ' +link_classname}
                          activeClassName={Styles['active']}
                          onClick={this.onSelectTab.bind(this,itemChild,index)}>{itemChild.props.children}</Link>)
            } else {
                return (
                    <a key={index} href={value.url?value.url:'javascript:;'} target='_blank'  id={itemChild.props.id}
                       className={className+disabledClassName}
                       onClick={this.onSelectTab.bind(this,itemChild,index)}>{itemChild.props.children}</a>
                )
            }
        }, this);

        return (
            <div className={Styles['Tab']}>
                <div className={Styles['links']}>
                    {tabElements}
                </div>
            </div>
        )

    }
});

let Option = React.createClass({
    propTypes: {
        isLink: React.PropTypes.bool,        //是否是连接
        linkUrl: React.PropTypes.string,      //链接地址
        isSelected: React.PropTypes.bool,        //是否选中
        isDisable: React.PropTypes.bool,       //是否可以切换
        id : React.PropTypes.string,
        callback: React.PropTypes.func         //回调函数
    },
    render(){
        return (
            null
        )
    }
});

Tab.Option = Option;

export default Tab;