var React = require('react');
var Styles = require('./SearchBox.css');
var $= require('jquery');
var SearchBox = React.createClass({
    propTypes :{
        refValue : React.PropTypes.string,
        keyName  : React.PropTypes.string,
        top      : React.PropTypes.string,
        searchCallback : React.PropTypes.func,
        cancelCallback : React.PropTypes.func
    },
    onSearch: function(e){
        e.nativeEvent.stopImmediatePropagation();
        var value =$.trim( React.findDOMNode(this.refs[this.props.refValue]).value);
        if(value!=''){
            this.props.searchCallback(this.props.refValue,this.props.keyName,value,value);
        }
    },
    onFocus : function(e){
        e.nativeEvent.stopImmediatePropagation();
    },
    render : function(){
        var style={
            top : this.props.top
        };
        return (
            <div className={Styles['search-box']} style={style} onClick={this.onFocus}>
                <div className={Styles['search-input']}>
                    <input type='text' id={this.props.refValue} name={this.props.refValue} onClick={this.onFocus} ref={this.props.refValue} className={Styles['input']} />
                    <a href='javascript:' className={Styles['search-btn']} onClick={this.onSearch}>搜索</a>
                </div>
            </div>
        )
    }
});

export default SearchBox;