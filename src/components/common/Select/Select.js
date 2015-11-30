var React = require('react');
var Styles = require('./Select.css');
var _ = require('underscore');
var $ = require('jquery');

var Select = React.createClass({
    propTypes : {
        height   : React.PropTypes.number,   //高度,
        width    : React.PropTypes.string,   //高度,
        options  : React.PropTypes.array,   //高度,
        value    :React.PropTypes.string,   //值,
        refValue : React.PropTypes.string,   //ref
        onChange : React.PropTypes.func,     //选项变化事件
        validate : React.PropTypes.string    //验证规则
    },
    getDefaultProps : function(){
        return {
            options : []
        }
    },
    getInitialState : function(){
        return {
            key         : "",
            value       : "",
            options     : [],
            isFromChild : false,
            isDropdown  : false,
            isInit      : true
        }
    },
    componentWillMount:function() {
        document.addEventListener('click', this.handleClick);
    },
    componentWillUnmount:function(){
        document.removeEventListener('click', this.handleClick);
    },
    componentDidMount : function(){
        var isFromChild = this.props.options.length==0;
        var options = isFromChild?this.props.children:this.props.options;
        this.initSetKeyValue(isFromChild ,options ,this.props.value);
    },
    componentWillReceiveProps : function (nextProps) {
        if(!this.state.isInit&&this.props.id == nextProps.id){
            return ;
        }
        var isFromChild = nextProps.options.length==0;
        var options = isFromChild?nextProps.children:nextProps.options;
        this.initSetKeyValue(isFromChild ,options ,nextProps.value);
    },
    initSetKeyValue : function(isFromChild, options, key){
        var value = "";
        var item = _.find(options, function (itemChild) {
            return isFromChild?(itemChild.props.isSelected):(itemChild.value==key);
        },this);
        if (item) {
            value = isFromChild?item.props.children:item.display;
        }
        this.setState({
            key : key,
            value : value,
            options : options,
            isFromChild : isFromChild,
            isDropdown : false
        })
    },
    handleClick : function(){
        this.setState({
            isDropdown : false
        })
    },
    onDropdown : function(e){
        e.nativeEvent.stopImmediatePropagation();

        var $disableBtn = $(e.target).parents('.disable-select');
        var $currentBtn = $(e.target);
        if($disableBtn.length>0||$currentBtn.hasClass('disable-select')){
            e.preventDefault();
            return;
        }

        /**
         * 下拉事件
         */
        this.setState({
            isDropdown : !this.state.isDropdown
        })
    },
    childrenSelect : function(value){
        /**
         * 选项选择事件
         */
        this.setState({
            key        : value.value,
            value      : this.props.options.length==0?value.children:value.display,
            isDropdown : false,
            isInit     : false
        });
        if(this.props.onChange){
            this.props.onChange(this.props.refValue,{key:value.value , value:value.children});
        }
    },
    onChange : function(e){

    },
    render : function(){
        //样式
        var valueStyle={
            height : this.props.height + 'px',
            lineHeight : this.props.height + 'px'
        };

        var dropStyle ={
            top : (this.props.height+5) + 'px'
        };
        var widthStyle;
        if(this.props.width){
            widthStyle = {
                width : this.props.width
            }
        }

        //下拉值
        var elements = null;
        if(this.state.isDropdown){
            elements =this.state.options.map(function(itemChild, index){
                var classvalue = this.state.isFromChild?(itemChild.props.value==this.state.key?Styles['selected']:''):(itemChild.value==this.state.key?Styles['selected']:'');
                return (
                    <div key={index} className={Styles['drop-item'] + ' ' + classvalue}
                         onClick={this.childrenSelect.bind(this, this.state.isFromChild?itemChild.props:{value:itemChild.value,display:itemChild.display})}>
                        {this.state.isFromChild?itemChild.props.children:itemChild.display}
                    </div>
                )
            },this);
        }

        return (
            <div className={Styles['select-box']} style={widthStyle}>
                <div className={Styles['input-box']+' select-input-box'} style={valueStyle} id={this.props.refValue+'_select'}>
                    <div className={Styles['select-value']+' select-box-value' } style={valueStyle} onClick={this.onDropdown}>{this.state.value}</div>
                    <input type='text' className={Styles['select-key']} style={valueStyle}
                           value={this.state.key}
                           onChange ={this.onChange}
                           ref={this.props.refValue}
                           name={this.props.refValue}
                           id={this.props.refValue}
                           data-validate={this.props.validate} />
                    <a href='javascript:;' className={Styles['select-btn']+' select-drop'} style={valueStyle} onClick={this.onDropdown}>
                        <i className={this.state.isDropdown?'icon-chevron-up':'icon-chevron-down'}></i>
                    </a>
                </div>
                <div className={Styles['drop-outter']+ ' ' +(this.state.isDropdown?'':'hide')} style={dropStyle}>
                    {elements}
                </div>
            </div>
        )
    }
});


/**
 *
 * 子元素
 */
var Option = React.createClass({
    propTypes : {
        value       : React.PropTypes.string,       //value值
        isSelected   : React.PropTypes.bool          //是否选择
    },
    render :function(){
        return null;
    }
});

Select.Option = Option;


export default Select;