import { configureStore } from '@reduxjs/toolkit';
import filters from '../components/heroesFilters/filtersSlice';
import heroes from '../components/heroesList/heroesSlice';

const stringMiddleWare = () => (next) => (action) => {
     if (typeof action === 'string') {
          return next({
               type: action
          })
     }
     return next(action);
}

// const store = createStore(
//                     combineReducers({filter, heroes}),
//                     compose(applyMiddleware(ReduxThunk, stringMiddleWare),
//                             window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
//                     );

const store = configureStore({
     reducer: {heroes, filters},
     middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleWare),
     devTools: process.env.NODE_ENV !== 'production',
});

export default store;