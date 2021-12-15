import {configureStore} from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import subscriptionReducer from './slices/subscriptionSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    subscription: subscriptionReducer,
  },
});

export default store;
