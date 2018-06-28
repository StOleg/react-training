import * as types from '../actions/actionTypes';

export default function courseReducer(state = [], action) {
    switch (action.type) {
        case types.SEARCH_IMAGE_SUCCESS:
            return action.images;
        default:
            return state;
    }
}