import { createSlice } from '@reduxjs/toolkit';
let initialState = {
  email: '',
  password: '',
};

const slice = createSlice({
  // 👇 슬라이스의 이름, 고유한 액션의 이름을 만들기 위한 prefix값으로 쓰임
  name: 'boilerplate',
  initialState,
  reducers: {
    // 수정해야함
    loginUser(state, action) {
      state.email = action.payload.email;
    },
  },
});

console.log('createSlice는 특정 오브젝트를 반환함 : ', slice);

export default slice.reducer;
//                   👆 고로 그 오브젝트 중 리듀서 필드만 빼서 수출, reducer"s"아님

export const actions = slice.actions;
//      👆 action.js파일에서 dispatch의 인자로 사용할
