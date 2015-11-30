import merge from 'lodash/object/merge';
import { routerStateReducer as router } from 'redux-router';
import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import QuestionCountReducer from './QuestionCountReducer';
import KnowledgeCountReducer from  './KnowledgeCountReducer';
import SubjectAreasReducer from './SubjectAreasReducer';
import SubjectListReducer from './SubjectListReducer';
import SubjectTypesReducer from './SubjectTypesReducer';
import QuestionListReducer from './QuestionListReducer';


const auth = AuthReducer;
const questionCount = QuestionCountReducer;
const knowledgeCount = KnowledgeCountReducer;
const subjectAreas = SubjectAreasReducer;
const subjectList = SubjectListReducer;
const subjectTypes = SubjectTypesReducer;
const questionList = QuestionListReducer;

const rootReducer = combineReducers({
    auth,
    questionCount,
    knowledgeCount,
    subjectAreas,
    subjectList,
    subjectTypes,
    questionList,
    router
});

export default rootReducer;
