import React, { useEffect } from 'react';
import axios from 'axios';

const LandingPage = () => {
  useEffect(() => {
    // 엔드포인트 '/api/hello'로 get 요청을 보냄 -> 받은 data를 console.log
    axios.get('/api/hello').then(response => console.log(response.data));
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh' }}>
      <h2>시작페이지</h2>
    </div>
  );
};

export default LandingPage;
