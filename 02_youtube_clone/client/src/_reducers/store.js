import { configureStore } from '@reduxjs/toolkit';
import reducer from './reducer';

const store = configureStore({
  // 👇combineReducer 역할을 해줌
  reducer: {
    A: reducer,
    // B : reducer2
  },
});

export default store;
