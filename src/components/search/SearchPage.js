import PropTypes from 'prop-types';
import React from 'react';
import Spinner from '../common/Spinner';
import Pagination from '../common/Pagination';

class SearchPage extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            searchText: ''
        };
        this.searchInput = React.createRef();
        this.onSearchClick = this.onSearchClick.bind(this);
    }

    onSearchClick() {
        const searchText = this.searchInput.current.value;
        this.props.searchActions.assignSearchQeury(searchText);
        this.props.searchActions.resetPage();
        this.props.searchActions.LoadImages();
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
                        className="form-control"
                    />
                    <input
                        type="button"
                        value="Search"
                        onClick={this.onSearchClick}
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