import { Provider, connect } from 'react-redux'
import { pushState } from 'redux-router'

import LoadingView from '../common/Loading/Loading.js'

function mapStateToProps(state) {
    return {
        isLoading: state.questionCount.fetching
    }
}

function mapDispatchToProps(dispatch) {
    return {}
}


export default connect(mapStateToProps, mapDispatchToProps)(LoadingView);
