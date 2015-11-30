var React = require('react');
import { Link } from 'react-router';
var Styles = require('./Pager.css');

var Pager = React.createClass({
    propTypes : {
        query        : React.PropTypes.object,      //查询
        linkValue    : React.PropTypes.string,      //路由
        pageCount    : React.PropTypes.number,      //总共页数
        recordCount  : React.PropTypes.number,      //记录数
        pageIndex    : React.PropTypes.number,      //当前页码
        pageShow     : React.PropTypes.number,      //显示的页数
        onPageChange : React.PropTypes.func         //页面变化函数
    },
    onPageClick:function(page){
        this.props.onPageChange(page)
    },
    render : function(){
        /**
         * 开始、结束的页码
         */
        var pageStart = 1;
        var pageEnd = this.props.pageShow;
        var pageHalf = this.props.pageShow/2 + 1;
        if(this.props.pageCount>this.props.pageShow){

            if(this.props.pageIndex > pageHalf){
                pageStart = this.props.pageIndex - pageHalf + 1;
            }

            if((this.props.pageCount - pageStart + 1)<10){
                pageStart = this.props.pageCount - 10 + 1;
            }

            pageEnd = pageStart + this.props.pageShow-1;

        }else{
            pageEnd =  this.props.pageCount;
        }

        var pageNumbers =[];
        for(var i = pageStart; i <= pageEnd; i++){
            if(i==this.props.pageIndex) {
                pageNumbers.push(
                    (
                        <span key={i}  className={Styles['pageitem']}>{i}</span>
                    )
                )
            }else{
                pageNumbers.push(
                    (
                        <Link key={i} to={this.props.linkValue+'/'+i}  onClick={this.onPageClick.bind(this,i)}  query={this.props.query} className={Styles['pageitem']}>{i}</Link>
                    )
                )
            }
        }

        var pagePre,pageNext;
        if(this.props.pageIndex > 1){
            pagePre = (
                <Link key={'prev_'+i} to={this.props.linkValue+'/'+(parseInt(this.props.pageIndex)-1)} onClick={this.onPageClick.bind(this,parseInt(this.props.pageIndex)-1)} query={this.props.query}
                      className={`${Styles['n']}${' '}${Styles['pageitem']}`}>上一页</Link>
            )
        }

        if(this.props.pageIndex < this.props.pageCount){
            pageNext = (
                <Link key={'next_'+i} to={this.props.linkValue+'/'+(parseInt(this.props.pageIndex)+1)}  onClick={this.onPageClick.bind(this,parseInt(this.props.pageIndex)+1)} query={this.props.query}
                      className={`${Styles['n']}${' '}${Styles['pageitem']}`}>下一页</Link>
            )
        }

        return (
            <div className={Styles['pager']}>
                {pagePre}
                {pageNumbers}
                {pageNext}
                <em className={Styles['recordInfo']}>共<em>{this.props.recordCount}</em>条记录</em>
            </div>
        )
    }
});

export default  Pager;