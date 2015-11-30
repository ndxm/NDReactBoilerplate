/**
 *题目统计
 */

import BaseService from './BaseService';
import APIPathPromise from '../utils/APIPath';

class QuestionCountService extends BaseService {
    /**
     * 获得题目数量列表
     * @returns {*}
     */
    loadQuestions() {
        return APIPathPromise.then((APIPath) => {
            let url = `${APIPath.QUESTION_COUNT}`;
            return this.get(url);
        });
    }


}
export default new QuestionCountService();