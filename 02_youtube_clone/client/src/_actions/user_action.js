// 비동기 처리 가능(본래 미들웨어 redux-thunk의 역할)
import axios from 'axios';
import { actions } from '../_reducers/reducer';

axios.defaults.baseURL = 'http://localhost:5000';
axios.defaults.withCredentials = true;

const loginUser = dataToSubmit => {
  // 👇 thunk미들웨어는 함수를 리턴
  return async (dispatch, getState) => {
    //                      👆 현재 state 정보를 받아볼 수 있음
    const res = await axios.post('/api/users/login', dataToSubmit);
    const request = res.data;

    dispatch(actions.loginUser(request));
    return request;
  };
};

const registerUser = dataToSubmit => {
  return async (dispatch, getState) => {
    const res = await axios.post('/api/users/register', dataToSubmit);
    const request = res.data;

    dispatch(actions.registerUser(request));
    return request;
  };
};

const authUser = () => {
  return async (dispatch, getState) => {
    const res = await axios.get('/api/users/auth');
    const request = res.data;

    dispatch(actions.authUser(request));
    return request;
  };
};

export const thunk = { loginUser, registerUser, authUser };
//           👆 컴포넌트 파일에서 dispatch의 인자로 사용할
