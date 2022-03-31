import { createStore, applyMiddleware, compose } from 'redux';
import { createWrapper } from 'next-redux-wrapper';
import thunk from 'redux-thunk';
//import window from 'global/window';
import rootReducer from '../reducers';
//export type RootState = ReturnType<typeof rootReducer>

const makeStore = () => createStore(
  rootReducer,
  compose(applyMiddleware(thunk)),
);

export const wrapper = createWrapper(makeStore, {debug: false});
