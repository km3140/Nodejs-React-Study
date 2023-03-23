import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const LandingPage = () => {
  axios.defaults.baseURL = 'http://localhost:5000';

  const navigate = useNavigate();

  const isAuth = useSelector(state => state.A.userData.isAuth);

  useEffect(() => {
    // 👇 엔드포인트 'http://localhost:5000/api/hello'로 get 요청을 보냄 -> 받은 data를 console.log
    axios.get('/api/hello').then(res => console.log(res.data));
  }, []);

  const onLogoutHandler = async () => {
    const res = await axios.get('/api/users/logout');

    if (res.data.success) {
      alert('로그아웃 성공');
      navigate('/login');
    } else {
      alert('로그아웃 실패');
    }
  };

  const onLoginHandler = async () => {
    navigate('/login');
  };

  const loginOutButton = () => {
    if (isAuth === true) {
      return <button onClick={onLogoutHandler}>로그아웃</button>;
    }
    if (isAuth === false) {
      return <button onClick={onLoginHandler}>로그인</button>;
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        height: '100vh',
      }}
    >
      <h2>시작페이지</h2>

      {loginOutButton()}
    </div>
  );
};

export default LandingPage;
