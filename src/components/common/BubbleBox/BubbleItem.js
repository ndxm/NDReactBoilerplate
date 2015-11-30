var React = require('react');
var Styles = require('./BubbleBox.css');
var BubbleItem = React.createClass({
    propTyeps : {
        isSelected : React.PropTypes.bool,
        showValue : React.PropTypes.string,
        value : React.PropTypes.string,
        onSelectCallback : React.PropTypes.func
    },
    onClick : function (e) {
        e.nativeEvent.stopImmediatePropagation();
        this.props.onSelectCallback(!this.props.isSelected , this.props.value,this.props.showValue );
    },
    render : function(){
        return (
            <a href='javascript:;' className={Styles['item']+' '+(this.props.isSelected?Styles['selected']:'')} onClick={this.onClick}>
                <i className={this.props.isSelected?'icon-check-sign':'icon-check-empty'}></i>{this.props.showValue}
            </a>
        )
    }
})

export default  BubbleItem;