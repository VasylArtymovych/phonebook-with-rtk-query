import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import filterSliceReducer from './filterSlice';
import { contactsApi } from './contactBookApi';

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [contactsApi.reducerPath]: contactsApi.reducer,
    filter: filterSliceReducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: getDefaultMiddleware => [
    ...getDefaultMiddleware(),
    contactsApi.middleware,
  ],
});

setupListeners(store.dispatch);
