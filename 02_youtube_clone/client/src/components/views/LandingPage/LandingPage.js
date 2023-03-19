import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const LandingPage = () => {
  const navigate = useNavigate();

  const isAuth = useSelector(state => state.A.userData.isAuth);
  console.log('isAuth? : ', isAuth);

  // const [isAuth, setIsAuth] = useState('');

  useEffect(() => {
    // 👇 엔드포인트 '/api/hello'로 get 요청을 보냄 -> 받은 data를 console.log
    axios.get('/api/hello').then(res => console.log(res.data));

    // axios.get('/api/users/auth').then(res => setIsAuth(res.data.isAuth));
    // 👆 페이지 접속 시 로그인여부 확인, 👇 아래처럼도 가능
    // (async () => {
    //   const authRes = await axios.get('/api/users/auth');
    //   const boolean = authRes.data.isAuth;
    //   setIsAuth(boolean);
    // })();
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
