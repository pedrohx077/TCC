import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:4000/login', { username, password });
      localStorage.setItem('token', response.data.token);
      navigate('/ships');
    } catch (error) {
      setError('Usuário ou senha inválidos');
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Bem-vindo ao Porto Seguro</h2>
        {error && <p className="error-message">{error}</p>}
        <div className="input-group">
          <label htmlFor="username">Usuário Portuário</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Digite seu usuário"
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Senha de Acesso</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Digite sua senha"
            required
          />
        </div>
        <div className="remember-container">
          <label>
            <input type="checkbox" /> Lembrar-se
          </label>
          <Link to="/register" className="register-link">
            Cadastre-se
          </Link>
        </div>
        <button type="submit" className="login-button">
          Acessar Porto
        </button>
      </form>
    </div>
  );
};

export default Login;
