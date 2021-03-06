import React from 'react';
import Header from './common/Header';
import SearchPage from '../containers/SearchPage';
import AboutPage from './about/AboutPage';
import { Router, Route } from 'react-router-dom';
import history from '../history/history';

class App extends React.Component {
    render() {
        return (
            <Router history={history}>
                <div>
                    <Header />
                    <Route exact path="/" component={SearchPage} />
                    <Route path="/about" component={AboutPage} />
                </div>
            </Router>
        );
    }
}

export default App;