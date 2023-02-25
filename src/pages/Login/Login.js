import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';
import Headers from '../../components/Headers/Headers';
import './Login.css';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  function handleUsernameChange(event) {
    setUsername(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log(username, password);
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate.push('/dashboard');
    }
  }, [navigate]);
  return (
    <Container className="d-flex align-items-center justify-content-center vh-100">
      <Headers />
      <Form onSubmit={handleSubmit} className="col-lg-6 col-md-8 col-sm-10">
        <Form.Group>
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            value={username}
            placeholder="admin"
            onChange={handleUsernameChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            value={password}
            placeholder="secret"
            onChange={handlePasswordChange}
          />
        </Form.Group>
        <Button type="submit" variant="primary" className="mt-3">
          Login
        </Button>
      </Form>
    </Container>
  );
}

export default LoginPage;
