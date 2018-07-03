import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import * as searchActions from '../../actions/searchActions';
import Spinner from '../common/Spinner';

class HomePage extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            searchText: ''
        };
        this.onSearchTextChange = this.onSearchTextChange.bind(this);
        this.onSearchClick = this.onSearchClick.bind(this);
    }

    onSearchTextChange(event) {
        const searchText = event.target.value;
        this.setState({ searchText: searchText });
    }

    onSearchClick() {
        const searchText = this.state.searchText;
        this.props.searchActions.searchImagesByText(searchText);
    }

    searchImageResult(image, index) {
        return (
            <div key={index} className="search-result-item">
                <a><img src={image.display_sizes[0].uri} /></a>
                <span>{image.title}</span>
            </div>
        );
    }

    render() {
        return (
            <div className="home-page">
                <h1 className="search-heading">Search for Images</h1>
                <input
                    type="text"
                    onChange={this.onSearchTextChange}
                    value={this.state.searchText}
                    className="search-input"
                />
                <input
                    type="submit"
                    value="Search"
                    onClick={this.onSearchClick}
                    className="btn search-btn"
                />
                <Spinner isLoading={this.props.isLoading} />
                {this.props.images.map(this.searchImageResult)}
            </div>
        );
    }
}

HomePage.propTypes = {
    images: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired,
    searchActions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        images: state.searchResult.images,
        isLoading: state.searchResult.isLoading
    };
}

function mapDispatchToProps(dispatch) {
    return {
        searchActions: bindActionCreators(searchActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);