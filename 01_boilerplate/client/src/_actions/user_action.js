// 비동기 처리 가능(미들웨어 redux-thunk의 역할)
import axios from 'axios';
import { actions } from '../_reducers/reducer';

function loginUser(dataToSubmit) {
  // 👇 thunk미들웨어는 함수를 리턴
  return async (dispatch, getState) => {
    //               👆 현재 state 정보를 받아볼 수 있음
    const res = await axios.post('/api/users/login', dataToSubmit);
    const request = res.data;

    dispatch(actions.loginUser(request));
  };
}

export const thunk = { loginUser };
//           👆 컴포넌트 파일에서 dispatch의 인자로 사용할
