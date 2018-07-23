import React from 'react';
import PropTypes from 'prop-types';

class Pagination extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.onPreviousClick = this.onPreviousClick.bind(this);
        this.onNextClick = this.onNextClick.bind(this);
    }

    onPreviousClick() {
        this.props.searchActions.decrementPage();
        this.props.searchActions.LoadImages();
    }

    onNextClick() {
        this.props.searchActions.incrementPage();
        this.props.searchActions.LoadImages();
    }

    render() {
        if (this.props.totalPages == 1) {
            return null;
        }
        return (
            <ul className="pagination justify-content-center">
                <li className="page-item">
                    <input
                        type="button"
                        value="Previous"
                        onClick={this.onPreviousClick}
                        className="page-link"
                        disabled={this.props.currentPage == 1}
                    />
                </li>
                <li className="page-item">
                    <span className="page-link disabled count">{this.props.currentPage}{" / "}{this.props.totalPages}</span>
                </li>
                <li className="page-item">
                    <input
                        type="button"
                        value="Next"
                        onClick={this.onNextClick}
                        className="page-link"
                        disabled={this.props.currentPage == this.props.totalPages}
                    />
                </li>
            </ul>
        );
    }
}

Pagination.propTypes = {
    searchActions: PropTypes.object.isRequired,
    currentPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired
};

export default Pagination;