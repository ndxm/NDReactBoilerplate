/**
 *题目统计
 */

import BaseService from './BaseService';
import APIPathPromise from '../utils/APIPath';

class KnowledgeCountService extends BaseService {

    /**
     * 获得知识点数量列表
     * @returns {*}
     */
    loadKnowledgeCounts() {
        return APIPathPromise.then((APIPath) => {
            let url = `${APIPath.KNOWLEDGE_COUNT}`;
            return this.get(url);
        });
    }


}
export default new KnowledgeCountService();