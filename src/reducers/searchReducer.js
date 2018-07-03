import * as types from '../actions/actionTypes';

const InitialState = {
    images: [],
    isLoading: false
};

export default function courseReducer(state = InitialState, action) {
    switch (action.type) {
        case types.GET_SEARCH_REQUEST:
            return Object.assign({}, state, {
                isLoading: true
            });
        case types.GET_SEARCH_SUCCESS:
            return Object.assign({}, state, {
                images: action.images,
                isLoading: false
            });
        default:
            return state;
    }
}