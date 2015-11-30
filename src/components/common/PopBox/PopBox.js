var React = require('react');

var PopBox = React.createClass({
    propTypes :{
        popTitle : React.PropTypes.string,
        cancelCallback : React.PropTypes.func
    },
    onCancel : function(){
        if(this.props.cancelCallback){
            this.props.cancelCallback();
        }
    },
    render : function(){
        return (
            <div className='mask '>
                <div className='dialog'>
                    <div className='dialog-title'>
                        {this.props.title}
                        <a href='javascript:' className='close-dialog' onClick={this.onCancel}><i className='icon-remove'></i></a>
                    </div>
                    {this.props.children}
                </div>
            </div>
        )
    }
});

export default PopBox;