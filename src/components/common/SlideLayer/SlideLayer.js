import React from 'react';
import Styles from './SlideLayer.css';
import $ from 'jquery';
let SlideLayer = React.createClass({
    propTypes: {
        id   :React.PropTypes.string,
        width: React.PropTypes.number,
        isShow: React.PropTypes.bool,
        onClose: React.PropTypes.func
    },
    getInitialState(){
        return {
            isAddTransition   : false,
            isAddTransition_2 : false,
            isToggleT         : false,
            isShow            : false,
            isHide            : false
        }
    },
    componentDidMount(){
        $("#main").bind('click', this.handleClick);
    },
    componentWillUnmount(){
        $("#main").unbind('click', this.handleClick);
    },
    handleClick(e){
        var $slide = $(e.target).parents('.open-slide');

        if($slide.length==0) {
            this.props.onClose();
        }
    },
    componentWillReceiveProps (nextProps){
        if(this.props.isShow&&nextProps.isShow){
            if(!this.props.id||(this.props.id!=nextProps.id)) {
                this.setState({
                    isAddTransition: !this.state.isAddTransition,
                    isAddTransition_2: this.state.isAddTransition,
                    isHide: false
                })
            }
        }else if(this.props.isShow&&!nextProps.isShow){
            this.setState({
                isHide  : true,
                isAddTransition   : false,
                isAddTransition_2 : false
            })
        }else{
            this.setState({
                isAddTransition   : false,
                isAddTransition_2 : false,
                isHide            : false
            })
        }


    },
    onClose: function () {
        this.props.onClose();
    },
    render: function () {
        let style = {};
        style['width'] = this.props.width + 'px';

        var className = 'open-slide '+Styles['slide-layer'];

        if(this.state.isAddTransition&&this.props.isShow){
            className+=' ';
            className+=Styles['show_animation'];
        }
        if(this.state.isAddTransition_2&&this.props.isShow){
            className+=' ';
            className+=Styles['show_animation_2'];
        }
        if(this.state.isHide&&!this.props.isShow){
            className+=' ';
            className+=Styles['hide_animation'];
        }
        if(this.props.isShow){
            className+=' ';
            className+=Styles['show'];
        }
        return (
            <div id="slide-layer" className={className} style={style}>
                <a href='javascript:;' className={Styles['closeBtn']}  onClick={this.onClose}><i
                    className="icon-angle-right"></i></a>
                <div className={Styles['slide-layer-inner']}>
                {this.props.children}
                </div>
            </div>
        )
    }
});

export default SlideLayer;