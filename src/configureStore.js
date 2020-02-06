import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { applyMiddleware, createStore } from 'redux';
import rootReducer from './rootReducer';

export const configureStore = () => {
  const middlewares = [thunk];

  const composeEnhancer = composeWithDevTools(
    applyMiddleware(...middlewares)
  );

  const store = createStore(rootReducer, composeEnhancer);

  return store;
}
