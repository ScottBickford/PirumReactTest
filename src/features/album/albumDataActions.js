import {
  ALBUMDATA_LOADING,
  LOAD_ALBUMDATA,
  ALBUMDATA_LOADING_COMPLETED,
  ALBUM_TOGGLE_EXPANDCOLLAPSE,
  ALL_TOGGLE_EXPANDCOLLAPSE
} from './albumDataConstants';
import axios from 'axios';
import { toastr } from 'react-redux-toastr';

export const loadAlbumData = () => (dispatch, getState) => {
  dispatch({ type: ALBUMDATA_LOADING });
  axios
    .get('data.json')
    .then(response => {
      dispatch({ type: LOAD_ALBUMDATA, payload: response.data });
    })
    .catch(error => {
      toastr.error('Error', 'Could not load album data');
    })
    .finally(() => {
      dispatch({ type: ALBUMDATA_LOADING_COMPLETED });
    });
};

export const albumToggleExpandCollapse = (album) => (dispatch, getState) => {
  dispatch({ type: ALBUM_TOGGLE_EXPANDCOLLAPSE, payload: album });
}

export const allToggleExpandCollapse = () => (dispatch, getState) => {
  dispatch({ type: ALL_TOGGLE_EXPANDCOLLAPSE });
}