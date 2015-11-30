var React = require('react');
var Styles = require('./SearchTag.css');

var SearchTag = React.createClass({
    propTypes :{
        refValue: React.PropTypes.string,
        keyName : React.PropTypes.string,
        value : React.PropTypes.string,
        removeCallback : React.PropTypes.func
    },
    onRemove : function(refValue){
        this.props.removeCallback(refValue)
    },
    render : function(){
        return (
            <a key={this.props.indexValue} href='javascript:;' className={Styles['tag']} onClick={this.onRemove.bind(this,this.props.refValue)}>
                <span className={Styles['name']}>{this.props.keyName}：</span>
                <span className={Styles['value']}>{this.props.value}</span>
                <i className={'icon-remove '+Styles['remove']}></i>
            </a>
        )
    }
});

export default SearchTag;