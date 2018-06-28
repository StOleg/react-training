import request from 'superagent';
import * as types from './actionTypes';

const searchImagesByTextApiCall = searchText => {
  const queryParam = `fields=id,title,thumb,referral_destinations&phrase=${searchText}&sort_order=best`;
  return request
    .get('https://api.gettyimages.com/v3/search/images')
    .query(queryParam)
    .set('API-Key', '697wgfynhw53p7fzsw7dbder')
    .set('accept', 'json');
};

const searchImagesByTextSuccess = (images) => ({
  type: types.SEARCH_IMAGE_SUCCESS,
  images: images
});

export function searchImagesByText(searchText) {
  return function(dispatch) {
    searchImagesByTextApiCall(searchText).then(function(resp) {
      const data = JSON.parse(resp.text);
      dispatch(searchImagesByTextSuccess(data.images));
    });
  };
}