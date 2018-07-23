import * as types from '../actions/actionTypes';

const InitialState = {
    images: [],
    isLoading: false,
    searchQuery: '',
    currentPage: 1,
    pageSize: 20,
    totalPages: 1
};

export default function searchReducer(state = InitialState, action) {
    switch (action.type) {
        case types.GET_SEARCH_REQUEST:
            return Object.assign({}, state, {
                isLoading: true
            });
        case types.GET_SEARCH_SUCCESS: {
            const { images, result_count } = action.payload;
            const totalPages = Math.ceil(result_count / state.pageSize);
            return Object.assign({}, state, {
                images,
                totalPages,
                isLoading: false
            });
        }
        case types.INCREMENT_PAGE: {
            if (state.currentPage < state.totalPages) {
                return Object.assign({}, state, {
                    currentPage: state.currentPage + 1
                });
            } else {
                return state;
            }
        }
        case types.DECREMENT_PAGE: {
            if (state.currentPage != 1) {
                return Object.assign({}, state, {
                    currentPage: state.currentPage - 1
                });
            } else {
                return state;
            }
        }
        case types.RESET_PAGE:
            return Object.assign({}, state, {
                currentPage: 1
            });
        case types.ASSIGN_SEARCH_QUERY:
            return Object.assign({}, state, {
                searchQuery: action.query
            });
        default:
            return state;
    }
}