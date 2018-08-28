import PropTypes from 'prop-types';
import React from 'react';
import Spinner from '../common/Spinner';
import Pagination from '../common/Pagination';
import queryString from 'query-string';

class SearchPage extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            searchTextInput: ''
        };
        this.searchInput = React.createRef();
        this.handleSearch = this.handleSearch.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.handleUrlParams = this.handleUrlParams.bind(this);
    }

    componentDidMount() {
        this.handleUrlParams();
    }

    componentWillUnmount() {
        this.props.searchActions.resetPage();
    }

    handleUrlParams() {
        const params = queryString.parse(location.search);
        const searchText = params.searchText;
        const currentPage = Math.ceil(params.currentPage);
        const totalPages = Math.ceil(params.totalPages);
        if (searchText && currentPage && totalPages) {
            this.props.searchActions.assignSearchQeury(searchText, currentPage, totalPages);
            this.props.searchActions.LoadImages();
        }
    }

    handleSearch() {
        const searchTextInput = this.searchInput.current.value;
        this.props.searchActions.assignSearchQeury(searchTextInput, this.props.currentPage, this.props.totalPages);
        this.props.searchActions.resetCurrentPage();
        this.props.searchActions.LoadImages();
    }

    handleKeyPress(event) {
        if (event.key == 'Enter') {
            event.preventDefault();
            this.handleSearch();
        }
    }

    searchImageResult(image, index) {
        return (
            <div key={index} className="search-result-item">
                <a><img src={image.display_sizes[0].uri} /></a>
                <span className="search-result-item-title">{image.title}</span>
            </div>
        );
    }

    render() {
        return (
            <div className="search-page">
                <h1 className="search-heading">Search for Images</h1>
                <div className="input-group mb-3">
                    <input
                        type="text"
                        ref={this.searchInput}
                        onKeyPress={this.handleKeyPress}
                        className="form-control"
                    />
                    <input
                        type="button"
                        value="Search"
                        onClick={this.handleSearch}
                        className="btn btn-dark btn-search"
                    />
                </div>
                <Spinner isLoading={this.props.isLoading} />
                {this.props.images.map(this.searchImageResult)}
                <Pagination totalPages={this.props.totalPages} searchActions={this.props.searchActions} currentPage={this.props.currentPage} />
            </div>
        );
    }
}

SearchPage.propTypes = {
    images: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired,
    searchActions: PropTypes.object.isRequired,
    currentPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired
};

export default SearchPage;