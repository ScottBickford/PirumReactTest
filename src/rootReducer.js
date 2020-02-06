import { combineReducers } from "redux";
import { reducer as ToastrReducer } from 'react-redux-toastr';
import albumDataReducer from "./features/album/albumDataReducer";

const rootReducer  = combineReducers({
  toastr: ToastrReducer,
  album: albumDataReducer
})

export default rootReducer;