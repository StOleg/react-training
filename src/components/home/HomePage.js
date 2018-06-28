import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import * as searchActions from '../../actions/searchActions';

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
        return <div key={index}><a> <img src={image.display_sizes[0].uri} /> </a>{image.title}</div>;
    }

    render() {
        return (
            <div>
                <h1>Search for Images</h1>
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
                    className="btn"
                />
                {this.props.images.map(this.searchImageResult)}
            </div>
        );
    }
}

HomePage.propTypes = {
    images: PropTypes.array.isRequired,
    searchActions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        images: state.images
    };
}

function mapDispatchToProps(dispatch) {
    return {
        searchActions: bindActionCreators(searchActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);