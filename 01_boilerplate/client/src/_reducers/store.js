import { configureStore } from '@reduxjs/toolkit';
import reducer1 from './reducer1';

const store = configureStore({
  // 👇combineReducer 역할을 해줌
  reducer: {
    A: reducer1,
    // B : reducer2
  },
});

export default store;
