import PropTypes from 'prop-types';
import React from 'react';
import Header from './common/Header';

class App extends React.Component {
    render() {
        return (
            <div>
                <Header />
                {this.props.children}
            </div>
        );
    }
}

App.propTypes = {
    children: PropTypes.object.isRequired
};

export default App;