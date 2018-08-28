import request from 'superagent';
import * as types from './actionTypes';
import history from '../history/history';

const searchImagesByTextApiCall = (searchText, page, pageSize) => {
    const searchTextParam = searchText ? `&phrase=${searchText}` : '';
    const queryParam = `fields=id,title,thumb,referral_destinations${searchTextParam}&sort_order=best&page=${page}&page_size=${pageSize}`;
    return request
        .get('https://api.gettyimages.com/v3/search/images')
        .query(queryParam)
        .set('API-Key', '697wgfynhw53p7fzsw7dbder')
        .set('accept', 'json');
};

export const incrementPage = () => ({
    type: types.INCREMENT_PAGE
});

export const decrementPage = () => ({
    type: types.DECREMENT_PAGE
});

export const resetCurrentPage = () => ({
    type: types.RESET_CURRENT_PAGE
});

export const resetPage = () => ({
    type: types.RESET_PAGE
});

export const assignSearchQeury = (searchText, currentPage, totalPages) => ({
    type: types.ASSIGN_SEARCH_QUERY,
    searchText, currentPage, totalPages
});

export const searchImagesByTextSuccess = (payload) => ({
    type: types.GET_SEARCH_SUCCESS,
    payload
});

function searchImages(searchText, page, pageSize) {
    return function (dispatch) {
        dispatch({ type: types.GET_SEARCH_REQUEST });
        searchImagesByTextApiCall(searchText, page, pageSize).then(function (resp) {
            const data = JSON.parse(resp.text);
            dispatch(searchImagesByTextSuccess(data));
            history.push({
                pathname: "",
                search: `searchText=${searchText}&currentPage=${page}&totalPages=${Math.ceil(data.result_count / pageSize)}`
            });
        }).catch(error => {
            console.log(error);
        });
    };
}

export const LoadImages = () => {
    return (dispatch, getState) => {
        const searchResultState = getState().searchResult;
        const { currentPage, pageSize, searchQuery } = searchResultState;
        dispatch(searchImages(searchQuery, currentPage, pageSize));
    };
};