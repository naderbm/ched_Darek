import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducers from './redux';
import globalSagas from './sagas';
import { createLogger } from 'redux-logger';
import { persistReducer, persistStore } from 'redux-persist';
// import ImmutablePersistenceTransform from './ImmutablePersistenceTransform';
import storage from 'redux-persist/lib/storage'; // defaults to localStorag

// declare global {
//   interface Window {
//     __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
//   }
// }

// create saga middleWare
const sagaMiddleware = createSagaMiddleware();
// Create Logger middlewear
const logger = createLogger({
  collapsed: true,
  duration: true,
  diff: true,
});

//Persisit config
const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['generateqr', 'signup'],
  whiteList: [],
};
// Middle weares
const middlewares = [sagaMiddleware, logger];

// Enable redux dev tools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// // enable persist
const persistedReducer = persistReducer(persistConfig, reducers);
// Create Store

const store = createStore(persistedReducer, composeEnhancers(applyMiddleware(...middlewares)));
// Create store on persist

const persistor = persistStore(store);
//Run Middlewares
sagaMiddleware.run(globalSagas);
export { store, persistor };
