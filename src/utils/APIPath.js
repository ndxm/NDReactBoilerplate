/**
 * 定义前端使用的API接口路径
 */
import ConfigUtil from "./ConfigUtil";

let APIPathPromise = ConfigUtil.then((config) => {

    let host = config["host"];

    let API = {

        /**
         * 统计题目数
         */
        QUESTION_COUNT: '/v0.1/question/count',

        /**
         * 统计知识点数
         */
        KNOWLEDGE_COUNT: '/v0.1/knowledgeObjects/count',


        //获取学科领域列表
        GET_SUBJECT_AREAS: '/v0.1/subjectAreas',

        //获取学科列表
        GET_SUBJECT_LIST: '/v0.1/subjects',

        //获取题型列表
        GET_SUBJECT_TYPES: 'v0.1/subjects/questionTypes',

        //获取题目列表
        POST_QUESTION_LIST: 'v0.1//question/list'


    };

    for (let key in API) {
        if (API.hasOwnProperty(key)) {
            API[key] = `http://${host}/${API[key]}`;
        }
    }
    API.UC_HOST = `${config["uc_uri"]}`;
    API.HOST = `${host}`;
    API.REALM = `${config["realm"]}`;

    return API;

});
export default APIPathPromise;