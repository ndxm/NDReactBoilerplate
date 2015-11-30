/**
 *学科领域
 */

import BaseService from './BaseService';
import APIPathPromise from '../utils/APIPath';

class ExamService extends BaseService {

	//获取学科领域
    loadSubjectAreas() {
        return APIPathPromise.then((APIPath) => {
            let url = `${APIPath.GET_SUBJECT_AREAS}`;
            return this.get(url);
        });
    }

    //获取学科列表
    loadSubjectList(){
    	return APIPathPromise.then((APIPath) => {
            let url = `${APIPath.GET_SUBJECT_LIST}`;
            return this.get(url);
        });
    }

    //获取题型列表
    loadSubjectTypes(){
    	return APIPathPromise.then((APIPath) => {
            let url = `${APIPath.GET_SUBJECT_TYPES}`;
            return this.get(url);
        });
    }

    //获取题目列表
    loadQuestionList(data){
        return APIPathPromise.then((APIPath) => {
            let url = `${APIPath.POST_QUESTION_LIST}`;
            return this.post(url,JSON.stringify(data));
        });
    }


}
export default new ExamService();