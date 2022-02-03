import {createSlice} from '@reduxjs/toolkit';
import {getCurrentSubscriptionFromStorage} from '../../services/authService';

const initialState = {
  subscription: getCurrentSubscriptionFromStorage(),
};
export const subscriptionSlice = createSlice({
  name: 'subscription',
  initialState,
  reducers: {
    setSubscription: (state, {payload}) => {
      state.subscription = payload;
      state.subscription.isPro = payload?.stripe_price_id === 'REPLACE_THIS';
    },
  },
});

export const {setSubscription} = subscriptionSlice.actions;

export default subscriptionSlice.reducer;

export const selectCurrentSubscription = state =>
  state.subscription.subscription;
