import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { thunk } from '../../../_actions/user_action';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const onEmailHandler = event => {
    // 타이핑 할때마다 현재입력값으로 state를 바꿔줌
    setEmail(event.currentTarget.value);
  };

  const onNameHandler = event => {
    setName(event.currentTarget.value);
  };

  const onPasswordHandler = event => {
    setPassword(event.currentTarget.value);
  };

  const onConfirmPasswordHandler = event => {
    setConfirmPassword(event.currentTarget.value);
  };

  const onSubmitHandler = async event => {
    event.preventDefault();

    if (password !== confirmPassword) return alert('비밀번호와 비밀번호 확인은 같아야합니다!');

    let body = {
      email,
      name,
      password,
      confirmPassword,
    };
    console.log(body);

    const res = await dispatch(thunk.registerUser(body));
    const registerSuccess = res.registerSuccess;

    if (registerSuccess) {
      alert('Register Success!');
      navigate('/');
      // 👆 로그인 성공 시 '/'경로로 보내기
    } else {
      alert('Failed to sign up');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh' }}>
      <Form onSubmit={onSubmitHandler}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" value={email} onChange={onEmailHandler} placeholder="Enter email" />
          <Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" value={name} onChange={onNameHandler} placeholder="Name" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" value={password} onChange={onPasswordHandler} placeholder="Password" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            value={confirmPassword}
            onChange={onConfirmPasswordHandler}
            placeholder="Confirm Password"
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default RegisterPage;
