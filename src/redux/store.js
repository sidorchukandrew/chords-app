import authReducer from './slices/authSlice';
import {configureStore} from '@reduxjs/toolkit';
import performanceReducer from './slices/performanceSlice';
import subscriptionReducer from './slices/subscriptionSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    subscription: subscriptionReducer,
    performance: performanceReducer,
  },
});

export default store;
