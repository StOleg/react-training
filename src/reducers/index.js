import { combineReducers } from 'redux';
import searchResult from './searchReducer';

const rootReducer = combineReducers({
    searchResult
});

export default rootReducer;