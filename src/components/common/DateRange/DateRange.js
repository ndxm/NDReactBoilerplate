var React = require('react');
var Styles = require('./DateRange.css');
var $ = require('jquery');
var _ = require('underscore');

var DateRange = React.createClass({
    propTypes : {
        refValue : React.PropTypes.string,
        year : React.PropTypes.number,
        month : React.PropTypes.number,
        disabledmonths : React.PropTypes.array,
        callback : React.PropTypes.func
    },
    getDefaultProps : function(){
        return {
            disables : []
        }
    },
    getInitialState:function(){
        return {
            year : 0,
            tempYear : 0,
            month :0
        }
    },
    componentDidMount :function() {
        this.setState({
            disables :this.props.disabledmonths,
            year : this.props.year,
            tempYear : this.props.year,
            month : this.props.month
        })
        document.addEventListener('click', this.handleClick);
    },
    componentWillUnmount : function() {
        document.removeEventListener('click', this.handleClick)
    },
    componentWillReceiveProps : function(nextProps){
        this.setState({
            disables :nextProps.disabledmonths,
            year : nextProps.year,
            tempYear : nextProps.year,
            month : nextProps.month
        })
    },
    handleClick : function(){
        $('.dateMonth-box').hide();
        this.setState({
            tempYear  : this.state.year
        })
    },
    selectMonth : function(value){
        this.setState({
            month : value,
            year  : this.state.tempYear
        })
        this.props.callback(this.props.refValue , this.state.tempYear , value);
        $('.dateMonth-box').hide();
    },
    setYear : function(value,e){
        e.nativeEvent.stopImmediatePropagation();
        this.setState({
            tempYear :value
        })
    },
    disableClick : function(e){
        e.nativeEvent.stopImmediatePropagation();
    },
    onFocus : function(e){
        $('.dateMonth-box').hide();
        $('#box_'+this.props.refValue).show();
    },
    onChange:function(e){

    },
    render : function(){
        var arrayMonth =[1,2,3,4,5,6,7,8,9,10,11,12];
        return (
            <div className={Styles['DateMonth-outter']}>
                <div className={Styles['DateMonth-input']}>
                    <input type='text' id={this.props.refValue} name={this.props.refValue}
                           className='input-text '
                           onFocus={this.onFocus}
                           value ={this.state.year+'.'+this.state.month}
                           data-validate='{"isRequired" : true}'
                           onChange={this.onChange}
                        />
                </div>
                <div className={Styles['DateMonth-Box']+' dateMonth-box'} id={'box_'+ this.props.refValue}>
                    <div className={Styles['year']}>
                        <a href='javascript:;' className={Styles['prev']} onClick={this.setYear.bind(this,this.state.tempYear-1)}><i className='icon-double-angle-left'></i></a>
                        <span className={Styles['year-value']}>{this.state.tempYear}</span>
                        <a href='javascript:;' className={Styles['next']} onClick={this.setYear.bind(this,this.state.tempYear+1)}><i className='icon-double-angle-right'></i></a>
                    </div>
                    <div className={Styles['months']}>
                        {
                            arrayMonth.map(function(item,index){
                                var find_result = _.find(this.state.disables,{year:this.state.tempYear,month: item});
                                if(find_result){
                                    return (
                                        <a key={index} href='javascript:;' className={Styles['disabled']} onClick={this.disableClick}>{item}月</a>
                                    )
                                }

                                if(item==this.state.month&&this.state.tempYear==this.state.year){
                                    return (
                                        <a key={index} href='javascript:;' className={Styles['active']} onClick={this.selectMonth.bind(this,item)}>{item}月</a>
                                    )
                                }else{
                                    return (
                                        <a key={index} href='javascript:;' onClick={this.selectMonth.bind(this,item)}>{item}月</a>
                                    )
                                }
                            },this)
                        }
                    </div>
                </div>

            </div>
        )
    }
})

export default DateRange;