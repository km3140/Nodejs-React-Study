import axios from 'axios';
import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function NavBar() {
  const isAuth = useSelector(state => state.A.userData.isAuth);
  const navigate = useNavigate;

  const onLogoutHandler = async () => {
    const res = await axios.get('/api/users/logout');

    if (res.data.success) {
      alert('로그아웃 성공');
      navigate('/login');
    } else {
      alert('로그아웃 실패');
    }
  };

  const loginOutButtonHandler = () => {
    if (isAuth === true) {
      return (
        <Nav className=" my-2 my-lg-0" style={{ maxHeight: '100px' }}>
          <Nav.Link onClick={onLogoutHandler}>Logout</Nav.Link>
        </Nav>
      );
    }
    if (isAuth === false) {
      return (
        <Nav className=" my-2 my-lg-0" style={{ maxHeight: '100px' }}>
          <Nav.Link href="/login">Signin</Nav.Link>
          <Nav.Link href="/register">Signup</Nav.Link>
        </Nav>
      );
    }
  };

  return (
    <Navbar expand="lg">
      <Container fluid>
        <Navbar.Brand href="/" style={{ padding: '0 1rem' }}>
          <img
            alt=""
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_%282017%29.svg/2560px-YouTube_full-color_icon_%282017%29.svg.png"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{' '}
          MeTube
        </Navbar.Brand>
        <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }}>
          <Nav.Link href="/">Video</Nav.Link>
          <Nav.Link href="/">Subscription</Nav.Link>
        </Nav>
        {loginOutButtonHandler()}
      </Container>
    </Navbar>
  );
}

export default NavBar;
