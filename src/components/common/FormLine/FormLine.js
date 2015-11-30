var React = require('react');
var Styles = require('./FormLine.css');
var $ = require('jquery');
var FormLine = React.createClass({
    render: function () {
        return (
            <div className='field-line clearfix'>
                {this.props.children}
            </div>
        )
    }
});

var FormItem = React.createClass({
    propTypes: {
        width: React.PropTypes.string,
        maxWidth: React.PropTypes.string,
        minWidth: React.PropTypes.string,
        keyName: React.PropTypes.string,
        keyStyle: React.PropTypes.object,
        elementId: React.PropTypes.string
    },
    getDefaultProps: function () {
        return {
            width: '100%'
        }
    },
    onClick: function (e) {
        var parentDom = $(e.target).parents('.filed-item');
        parentDom.removeClass('field-item-error');
        parentDom.find('.field-item-error-info').remove();
    },
    render: function () {
        var style = {};
        if (this.props.width) {
            style.width = this.props.width;
        }
        if (this.props.maxWidth) {
            style.maxWidth = this.props.maxWidth;
        }
        if (this.props.minWidth) {
            style.minWidth = this.props.minWidth;
        }

        var keyTag = '';
        if (this.props.keyName) {
            keyTag = this.props.keyName.trim() == '' ? '' : ':';
        }

        var for_name = '';
        if (this.props.children && this.props.children.props) {
            for_name = this.props.children.props.name;
        }
        return (
            <div className='filed-item clearfix' style={style} onClick={this.onClick}>
                <label className='field-key fl' htmlFor={for_name}
                       style={this.props.keyStyle}>{this.props.keyName} {keyTag}</label>
                <div className='filed-read-value'>{this.props.children}</div>
            </div>
        )
    }
});

FormLine.FormItem = FormItem;

export default FormLine;