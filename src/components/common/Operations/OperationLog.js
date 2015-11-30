import React from 'react';
import Styles from './OperationLogs.css';
import _ from 'underscore';
import DateUtils from '../../../utils/DateUtils';
import OptionsDomain from '../../../constants/OptionsDomain'
import OptionsStore from '../../../stores/OptionsStore'

var OperationLog = React.createClass({

    propTypes: {
        item: React.PropTypes.object
    },

    _matchValue(_value){
        if(!_value){
            return '空';
        }


        if(typeof _value == 'number' && _value>10000000000){
            return DateUtils.returnDateString(_value);
        }


        if(_value===true){
            return '是';
        }

        if(_value===false){
            return '否';
        }
        let result ;
        Object.keys(OptionsDomain).forEach( (key)=> {
            OptionsStore.getOptions(OptionsDomain[key]).forEach((option)=>{
                if(option.value ===_value ){
                    result =  option.display;
                }
            });

        });

        return (!result) ? _value : result;
    },

    _getLogContent(log){
        let auditUser = !!log['created_by']['name'] ? log['created_by']['name'] : log['created_by']['id'];
        let option = log['op'];
        let optionTime = DateUtils.returnTimeString(log['created_date']);

        let logContent;
        switch (option) {
            case 'ADD':
                logContent = `${auditUser} 创建了该记录 ${optionTime}`;
                break;

            case 'UPDATE':
                let filedName = log['entity_field']['filed_name'];
                let oldValue = log['entity_field']['old_value'];
                let newValue = log['entity_field']['new_value'];
                if(_.isArray(newValue)){
                    if (!oldValue || newValue.length > oldValue.length) {
                        logContent = `${auditUser} 修改了该记录字段(${filedName})：新增一条记录 ${optionTime}`;
                    } else if (oldValue.length > newValue.length) {
                        logContent = `${auditUser} 修改了该记录字段(${filedName})：减少一条记录 ${optionTime}`;
                    }
                    break;
                }
                let oldValueDisplay = this._matchValue(oldValue);
                let newValueDisplay = this._matchValue(newValue);
                logContent = `${auditUser} 修改了该记录字段(${filedName})：'${oldValueDisplay}' -> '${newValueDisplay}' ${optionTime}`;
                break;

            case 'DELETE':
                logContent = `${auditUser} 删除了该记录 ${optionTime}`;
                break;

            default :
                logContent = log['log_ontent'];
                break;
        }

        return logContent;
    },

    _getIcon(log){
        let icon;

        switch (log['op']) {
            case 'ADD':
                icon = <i className={'icon-plus '+Styles['icon'] }/>;
                break;

            case 'UPDATE':
                icon = <i className={'icon-pencil '+Styles['icon'] }/>;
                break;

            default :
                icon = <i className={'icon-pencil '+Styles['icon'] }/>;
                break;
        }
        return icon;
    },

    render() {

        return (
            <div className={Styles['log']}>
                {this._getIcon(this.props.item)}
                {this._getLogContent(this.props.item)}
            </div>
        )
    }
});

export default OperationLog;