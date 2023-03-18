// HOC : Higher-Order Component
// 이 파일이 다른 컴포넌트 위에 감싸져서 먼저 실행된다, 인증관련 처리를 할 것, 중복을 줄일 수 있다
// 아무나 진입이 가능한 페이지 : LandingPage, AboutPage
// 로그인한 회원만 진입 가능한 페이지 : DetailPage
// 로그인한 회원은 진입 못 하는 페이지 : LoginPage, RegisterPage
// 관리자만 진입 가능한 페이지 : AdminPage

import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { thunk } from '../_actions/user_action';
//                👇 래핑 당할 컴포넌트    👇 어드민 페이지인지에 대한 bool
const Auth = (SpecificComponent, option, adminRoute = null) => {
  //                              👆 null : 아무나 출입이 가능한 페이지
  //                                 true : 로그인한 유저만 출입 가능한 페이지
  //                                 false : 로그인한 유저는 출입 불가능한 페이지
  const AuthenticationCheck = props => {
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(thunk.authUser()).then(res => console.log(res));
    }, []);

    return <SpecificComponent />;
  };

  return AuthenticationCheck;
};

export default Auth;
