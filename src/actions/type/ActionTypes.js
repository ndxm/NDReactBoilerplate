/**
 * action 类型
 */

export const LOGIN = "LOGIN";   //登录
export const LOGIN_REQUEST = "LOGIN_REQUEST";   //登录请求开始
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";   //登录成功
export const LOGIN_FAILED = "LOGIN_FAILED";     //登录失败

export const LOGOUT = "LOGOUT";     //退出
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";     //退出成功


export const QUESTION_COUNT_REQUEST = "QUESTION_COUNT_REQUEST";     //题目数量列表请求开始
export const QUESTION_COUNT_SUCCESS = "QUESTION_COUNT_SUCCESS";     //题目数量列表请求成功
export const QUESTION_COUNT_FAILURE = "QUESTION_COUNT_FAILURE";     //题目数量列表请求失败

export const KNOWLEDGE_COUNT_REQUEST = "KNOWLEDGE_COUNT_REQUEST";       //知识点数量列表请求开始
export const KNOWLEDGE_COUNT_SUCCESS = "KNOWLEDGE_COUNT_SUCCESS";       //知识点数量列表请求成功
export const KNOWLEDGE_COUNT_FAILURE = "KNOWLEDGE_COUNT_FAILURE";       //知识点数量列表请求失败


export const GET_SUBJECT_AREAS_REQUEST = "GET_SUBJECT_AREAS_REQUEST";       //题目推送-题目列表-领域请求开始
export const GET_SUBJECT_AREAS_SUCCESS = "GET_SUBJECT_AREAS_SUCCESS";       //题目推送-题目列表-领域请求成功
export const GET_SUBJECT_AREAS_FAIL = "GET_SUBJECT_AREAS_FAIL";             //题目推送-题目列表-领域请求失败


export const GET_SUBJECT_LIST_REQUEST = "GET_SUBJECT_LIST_REQUEST";       //题目推送-题目列表-列表请求开始
export const GET_SUBJECT_LIST_SUCCESS = "GET_SUBJECT_LIST_SUCCESS";       //题目推送-题目列表-列表请求成功
export const GET_SUBJECT_LIST_FAIL = "GET_SUBJECT_LIST_FAIL";             //题目推送-题目列表-列表请求失败

export const GET_SUBJECT_TYPES_REQUEST = "GET_SUBJECT_TYPES_REQUEST";       //题目推送-题目列表-题型请求开始
export const GET_SUBJECT_TYPES_SUCCESS = "GET_SUBJECT_TYPES_SUCCESS";       //题目推送-题目列表-题型请求成功
export const GET_SUBJECT_TYPES_FAIL = "GET_SUBJECT_TYPES_FAIL";             //题目推送-题目列表-题型请求失败


export const POST_QUESTION_LIST_REQUEST = "POST_QUESTION_LIST_REQUEST";		//题目推送-题目列表-题目列表开始
export const POST_QUESTION_LIST_SUCCESS = "POST_QUESTION_LIST_SUCCESS";		//题目推送-题目列表-题目列表成功
export const POST_QUESTION_LIST_FAIL = "POST_QUESTION_LIST_FAIL";			//题目推送-题目列表-题目列表失败


