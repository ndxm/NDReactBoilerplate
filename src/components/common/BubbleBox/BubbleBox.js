var React = require('react');
var _ = require('underscore');
var Styles = require('./BubbleBox.css');
var BubbleItem = require('./BubbleItem');
var BubbleBox = React.createClass({
    propTypes : {
        refValue : React.PropTypes.string,
        keyName : React.PropTypes.string,
        items : React.PropTypes.array,
        confirmCallback :React.PropTypes.func
    },
    getInitialState : function(){
        return {
            selecteds : []
        }
    },
    onItemSelect : function(isSelected,value,showValue){
        var selecteds = this.state.selecteds;
        if(isSelected){
            selecteds.push({
                value :value,
                showValue : showValue
            })
        }else{
            var temps = _.filter(selecteds, function (item) {
                return item.value !=value;
            })
            selecteds = temps;
        }
        this.setState({
            selecteds : selecteds
        })
    },
    onCancel : function(){
        this.props.cancelCallback(this.props.refValue);
    },
    onConfirm : function(){
        if(this.state.selecteds.length>0){

            var values= _.pluck(this.state.selecteds,'value').join(',');
            var showValue= _.pluck(this.state.selecteds,'showValue').join('、');
            this.props.confirmCallback(this.props.refValue,this.props.keyName,showValue,values);
        }
    },
    onClick: function(e){
        e.nativeEvent.stopImmediatePropagation();
    },
    render : function(){
        return (
            <div className={Styles['box']} onClick={this.onClick}>
                <div className={Styles['box-inner']}>
                    {
                        this.props.items.map(function(item,index){

                            var isSelected = _.find(this.state.selecteds,function(item_selected){
                                return item.value == item_selected.value
                            })!=undefined;

                            return (
                                <BubbleItem key={index} isSelected={isSelected} refValue={this.props.refValue} showValue={item.display} value={item.value} onSelectCallback={this.onItemSelect} ></BubbleItem>
                            )
                        },this)
                    }
                </div>
                <div className={Styles['btns']}>
                    <a href='javascript:;' className={Styles['btn-confirm']} onClick={this.onConfirm}>确认</a>
                </div>
            </div>
        )
    }
});

export default BubbleBox;