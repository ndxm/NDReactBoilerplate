import React from 'react';
import Styles from './Switch.css';
var $ = require('jquery');

var Switch = React.createClass({
    propTypes : {
        id       : React.PropTypes.string,
        style    : React.PropTypes.object,
        isOn     : React.PropTypes.bool,
        callback : React.PropTypes.func
    },
    getInitialState(){
        return {
            isOn : false
        }
    },
    componentDidMount(){
        this.setState({
            isOn : this.props.isOn
        })
    },
    componentWillReceiveProps(nextProps){
        if(this.props.isOn!=nextProps.isOn) {
            this.setState({
                isOn: nextProps.isOn
            })
        }
    },
    onSwitch(e){

        var $disableBtn = $(e.target).parents('.disable-switch');
        var $currentBtn = $(e.target);
        if($disableBtn.length>0||$currentBtn.hasClass('disable-switch')){
            e.preventDefault();
            return;
        }

        if(this.props.callback){
            var result = this.props.callback(this.props.id,!this.props.isOn);
            if(result){
                this.setState({
                    isOn: !this.state.isOn
                })
            }
        }else {
            this.setState({
                isOn: !this.state.isOn
            })
        }
        e.stopPropagation();
    },
    render(){
        var className = null;
        if(this.state.isOn){
            className = Styles['on'];
        }

        return (
            <div className={Styles['switch']+' switch-btn '+className} style={this.props.style} onClick={this.onSwitch}>
                <a href='javascript:;' className={Styles['switch-btn']} />
            </div>
        )
    }
});

export default Switch;