var React = require('react');
var Styles = require('./CheckBox.css');
var _ = require('underscore');
var $ = require('jquery');

var CheckBox = React.createClass({
    propTypes : {
        id : React.PropTypes.string
    },
    render : function() {
        return (
            <div id={this.props.id} className={Styles['check-box']}>{this.props.children}</div>
        )
    }
});



/**
 * 子选项设置
 */


var CheckItem=React.createClass({
    propTypes : {
        value       : React.PropTypes.string,       //value值
        refValue    : React.PropTypes.string,       //ref
        isChecked   : React.PropTypes.bool,         //是否选择
        isReadonly  : React.PropTypes.bool,         //是否只读
        callback    : React.PropTypes.func          //回调函数
    },
    getDefaultProps : function () {
        return {
            isChecked : false
        }
    },
    getInitialState : function()
    {
        return {
            isChecked : false,
            isInit    : true
        }
    },
    componentDidMount : function(){
        this.setState({
            isChecked : this.props.isChecked
        })
    },
    componentWillReceiveProps : function(nextProps){
        if(!this.state.isInit&&this.props.isChecked==nextProps.isChecked){
            return ;
        }
        this.setState({
            isChecked : nextProps.isChecked
        })
    },
    onChecked : function(isChecked,e){
        var $disableBtn = $(e.target).parents('.disable-checkbox');
        var $currentBtn = $(e.target);
        if($disableBtn.length>0||$currentBtn.hasClass('disable-checkbox')){
            e.preventDefault();
            return;
        }

        if(this.props.isReadonly==true){
            return ;
        }
        if(this.props.callback){
            this.props.callback(this.props.refValue,isChecked,e)
        }
        else{
            this.setState({
                isChecked : isChecked,
                isInit    : false
            })
        }
    },
    onChange : function () {

    },
    render :function(){
        var isChecked = this.state.isChecked;

        var checkClassName = isChecked?Styles['checked']:'';
        var checked =isChecked?'checked':'';

        return (
            <div className={Styles['item']+' checkbox'} onClick={this.onChecked.bind(this,!isChecked)}>
                <span
                    className={Styles['item-check']+' '+checkClassName+' '+(this.props.isReadonly?Styles['disabled']:'')+ 'item-checkbox'}></span>
                <input ref={this.props.refValue} type='checkbox'
                       id={this.props.refValue}
                       value={this.props.value}
                       checked={checked}
                       name={this.props.refValue}
                       disabled={this.props.isReadonly?'disabled':''}
                       onChange={this.onChange}
                    />
                <span className={Styles['item-value']}>
                    {this.props.children}
                </span>
            </div>
        )
    }
});




CheckBox.CheckItem = CheckItem;

module.exports = CheckBox;