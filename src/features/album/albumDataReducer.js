import { createReducer } from '../../createReducer';
import {
  ALBUMDATA_LOADING,
  ALBUMDATA_LOADING_COMPLETED,
  LOAD_ALBUMDATA,
  ALBUM_TOGGLE_EXPANDCOLLAPSE,
  ALL_TOGGLE_EXPANDCOLLAPSE
} from './albumDataConstants';

const initialState = {
  loading: false,
  loaded: false,
  albums: [],
  allCollapsed: true
};

// DISPATCHED: Loading
const loading = (state, payload) => {
  return {
    ...state,
    loading: true
  };
};

// DISPATCHED: Loading Completed
const loadingCompleted = (state, payload) => {
  return {
    ...state,
    loading: false
  };
};

// DISPATCHED: Load Album Data
const loadAlbumData = (state, payload) => {
  const albums = getFilteredList(payload);

  albums.forEach(album => {
    album.songs = payload
      .filter(p => p.band === album.band && p.album === album.album)
      .map(a => {
        return a.song;
      });
    album.collapsed = true;
  });

  return {
    ...state,
    albums,
    loaded: true
  };
};

const getFilteredList = albums => {
  // Filter by band and album
  const list = albums.map(a => {
      return { band: a.band, album: a.album };
    }),
    keys = ['band', 'album'],
    filtered = list.filter(
      (s => o => (k => !s.has(k) && s.add(k))(keys.map(k => o[k]).join('|')))(
        new Set()
      )
    );

  return sortList(filtered);
};

const sortList = albums => {
  return albums.sort(function(a, b) {
    if (a.band + a.album < b.band + b.album) {
      return -1;
    }
    if (a.band + a.album > b.band + b.album) {
      return 1;
    }

    // names must be equal
    return 0;
  });
};

// DISPATCHED: Toggle Expand Collapse On Album
const AlbumToggleExpandCollapse = (state, payload) => {
  // Get the album instance
  const filter = state.albums.filter(
    a => a.band === payload.band && a.album === payload.album
  );
  // Toggle
  const album = filter.length > 0 ? filter[0] : null;
  album.collapsed = !album.collapsed;

  // Create a new array with the updated value
  const albums = [
    ...state.albums.filter(
      a => a.band !== payload.band || a.album !== payload.album
    ),
    album
  ];

  return {
    ...state,
    albums: sortList(albums)
  };
};

// DISPATCHED: Toggle Expand Collapse All Albums
const AllToggleExpandCollapse = (state, payload) => {
  const allCollapsed = !state.allCollapsed;
  const albums = state.albums;
  albums.forEach(a => {
    a.collapsed = allCollapsed;
  });

  return {
    ...state,
    albums,
    allCollapsed
  };
};

// The createReducer method is found under src/createReducer.js.
// This function enables you to create a reducer in a different, more readable way.
// Instead of having everything in one giant method with a switch statement for your actions, this function
// splits your actions into it's own methods making it more readable
export default createReducer(initialState, {
  [ALBUMDATA_LOADING]: loading,
  [ALBUMDATA_LOADING_COMPLETED]: loadingCompleted,
  [LOAD_ALBUMDATA]: loadAlbumData,
  [ALBUM_TOGGLE_EXPANDCOLLAPSE]: AlbumToggleExpandCollapse,
  [ALL_TOGGLE_EXPANDCOLLAPSE]: AllToggleExpandCollapse
});
