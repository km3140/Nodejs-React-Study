import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunk } from '../../../_actions/user_action';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const loginSuccess = useSelector(state => state.A.loginSuccess);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onEmailHandler = event => {
    // 타이핑 할때마다 현재입력값으로 state를 바꿔줌
    setEmail(event.currentTarget.value);
  };

  const onPasswordHandler = event => {
    setPassword(event.currentTarget.value);
  };

  const onSubmitHandler = async event => {
    event.preventDefault();

    let body = {
      email: email,
      password: password,
    };
    console.log(body);

    const res = await dispatch(thunk.loginUser(body));
    const loginSuccess = res.loginSuccess;

    if (loginSuccess) {
      alert('Login Success!');
      navigate('/');
      // 👆 로그인 성공 시 '/'경로로 보내기
    } else {
      alert('Failed to sign in');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh' }}>
      <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={onSubmitHandler}>
        <label>Email</label>
        <input type="email" value={email} onChange={onEmailHandler} />
        <label>Password</label>
        <input type="password" value={password} onChange={onPasswordHandler} />
        <br />
        <button>Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
