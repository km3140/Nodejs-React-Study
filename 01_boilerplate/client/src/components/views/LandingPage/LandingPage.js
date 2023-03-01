import React, { useEffect } from 'react';
import axios from 'axios';
import { response } from 'express';

const LandingPage = () => {
  useEffect(() => {
    // 엔드포인트 /api/hello로 get 요청을 보냄 -> 받은 data를 console.log
    axios.get('/api/hello').then(response => console.log(response.data));
  }, []);

  return <div>LandingPage</div>;
};

export default LandingPage;
