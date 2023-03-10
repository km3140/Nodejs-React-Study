import { createSlice } from '@reduxjs/toolkit';
let initialState = {
  loginSuccess: '',
};

const slice = createSlice({
  // ๐ ์ฌ๋ผ์ด์ค์ ์ด๋ฆ, ๊ณ ์ ํ ์ก์์ ์ด๋ฆ์ ๋ง๋ค๊ธฐ ์ํ prefix๊ฐ์ผ๋ก ์ฐ์
  name: 'boilerplate',
  initialState,
  reducers: {
    loginUser(state, action) {
      state.loginSuccess = action.payload.loginSuccess;
    },
  },
});

console.log('createSlice๋ ํน์  ์ค๋ธ์ ํธ๋ฅผ ๋ฐํํจ : ', slice);

export default slice.reducer;
//                   ๐ ๊ณ ๋ก ๊ทธ ์ค๋ธ์ ํธ ์ค ๋ฆฌ๋์ ํ๋๋ง ๋นผ์ ์์ถ, reducer"s"์๋

export const actions = slice.actions;
//      ๐ action.jsํ์ผ์์ dispatch์ ์ธ์๋ก ์ฌ์ฉํ 
