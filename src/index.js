import React from 'react';
import ReactDOM from 'react-dom';
import rootReducers from './reducers';
import rootSagas from './sagas';
import {applyMiddleware, createStore} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {Provider} from 'react-redux';
import PangeaApp from './PangeaApp';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducers, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSagas);

ReactDOM.render(
  <Provider store={store}>
    <PangeaApp />
  </Provider>,
  document.getElementById('root')
);

