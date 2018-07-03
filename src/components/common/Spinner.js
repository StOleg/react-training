import React from 'react';
import PropTypes from 'prop-types';

const Spinner = (props) => {
    if (!props.isLoading) {
        return null;
    }
    return (
        <div className="spinner-container">
            <div className="spinner"></div>
        </div>
    );
};

Spinner.propTypes = {
    isLoading: PropTypes.bool.isRequired
};

export default Spinner;