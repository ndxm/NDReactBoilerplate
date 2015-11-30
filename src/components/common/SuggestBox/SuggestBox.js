var React = require('react');
var Styles = require('./SuggestBox.css');
var SuggestBox = React.createClass({
    propTypes : {
        refValue               : React.PropTypes.string,
        suggestList            : React.PropTypes.array,
        inputChangeCallback    : React.PropTypes.func,
        clickCallback          : React.PropTypes.func,
        height                 : React.PropTypes.number
    },
    getInitialState : function(){
        return {
            isShowClear : false,
            isDropdown  : false,
            inputValue  : ""
        }
    },
    componentDidMount :function() {
        document.addEventListener('click', this.handleClick)
    },
    componentWillUnmount : function() {
        document.removeEventListener('click', this.handleClick)
    },
    handleClick : function(){
        this.setState({
            isDropdown : false
        })
    },
    onChange : function(e){
        var value = e.target.value;
        this.setState({
            isShowClear : value.trim() != "",
            inputValue  : value,
            isDropdown  : value.trim() != ""
        });

        if(this.props.inputChangeCallback){
            this.inputChangeCallback(value.trim());
        }
    },
    onClick : function(value){
        this.setState({
            isShowClear : false,
            inputValue  : value
        });
        if(this.props.clickCallback){
            this.clickCallback(value.trim());
        }
    },
    onClear : function(){
        this.setState({
            inputValue : "",
            isDropdown : false,
            isShowClear : false
        })
    },
    render : function(){

        var valueStyle={
            height : this.props.height + 'px',
            lineHeight : this.props.height + 'px'
        };

        var isShowDropdown = this.props.suggestList.length>0&&this.state.isDropdown;

        var dropStyle ={
            height : (this.props.height-2) + 'px',
            lineHeight:(this.props.height-2) + 'px'
        };
        return (
            <div className={Styles['suggest-box']}>
                <div className={Styles['suggest-input-box']}>
                    <input type="text" onChange={this.onChange} onFocus ={this.onFocus} onBlur={this.onBlur} placeholder=""
                           className={'input-text '+Styles['input']}
                           style={valueStyle}
                           value ={this.state.inputValue}
                           id={this.props.refValue} name={this.props.refValue} ref={this.props.refValue} />
                    <div className={Styles['clearInput']+(this.state.isShowClear?" ":" hide")} style={dropStyle}  onClick={this.onClear}><i className="icon-remove-circle"></i></div>
                </div>
                <div className={Styles['suggest-panel']}>
                    <div className={Styles['suggest-content']+(isShowDropdown?'':' hide')}>
                        {
                            this.props.suggestList.map(function(suggestItem,index){
                                return (
                                    <a key={index} href="javascript:" onClick={this.onClick.bind(this,suggestItem)} className={Styles['suggest-item']}>{suggestItem}</a>
                                )
                            },this)
                        }
                    </div>
                </div>
            </div>
        )
    }
});

export default SuggestBox;