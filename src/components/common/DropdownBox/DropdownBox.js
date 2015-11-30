import React from 'react';
import Styles from './DropdownBox.css';
import $ from 'jquery';

var DropdownBox = React.createClass({
    propTypes:{
        height : React.PropTypes.string,
        width  : React.PropTypes.string,
        title  : React.PropTypes.string,
        style : React.PropTypes.object
    },
    getInitialState(){
        return {
            isDropdown : false
        }
    },
    componentWillMount() {
        document.addEventListener('click', this.handleClick);
    },
    componentWillUnmount(){
        document.removeEventListener('click', this.handleClick);
    },
    handleClick(e){
        var $current =$(e.target);
        var $dropdownTitle = $(e.target).parents('.dropdown-title');
        if($dropdownTitle.length==0&&!$current.hasClass('dropdown-title')){
            this.setState({
                isDropdown : false
            })
        }else{
            this.setState({
                isDropdown : !this.state.isDropdown
            })
        }
    },
    render(){
        var titleStyle = {
            width : this.props.width ,
            height : this.props.height,
            lineHeight : this.props.height
        };
        var iconStyle= {

        };
        return (
            <div className={Styles['dropdown-box']} style={this.props.style}>
                <a href='javascript:;' style={titleStyle} className={Styles['dropdown-title']+' dropdown-title'} >{this.props.title}<i className={(this.state.isDropdown?"icon-caret-up ":"icon-caret-down ")+Styles['dropdown-icon']} style={iconStyle}></i></a>
                <div className={Styles['dropdown-body'] + (this.state.isDropdown?' ':' hide')}>
                    {this.props.children}
                </div>
            </div>
        )
    }
});

export default DropdownBox;