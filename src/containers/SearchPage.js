import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as searchActions from '../actions/searchActions';
import SearchPage from '../components/search/SearchPage';

function mapStateToProps(state) {
    return {
        images: state.searchResult.images,
        isLoading: state.searchResult.isLoading,
        currentPage: state.searchResult.currentPage,
        totalPages: state.searchResult.totalPages
    };
}

function mapDispatchToProps(dispatch) {
    return {
        searchActions: bindActionCreators(searchActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);