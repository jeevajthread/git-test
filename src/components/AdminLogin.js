import React, { useState } from 'react';
import AdminService from '../service/AdminService';
import '../css/Login.css';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const authenticateAdmin = (e) => {
    e.preventDefault();

    if (username.trim() === '' || password.trim() === '') {
      setError('Please enter both username and password.');
      return;
    }

    let admin = {
      username: username,
      password: password
    };

    AdminService.authenticateAdmin(admin)
      .then((res) => {
        const jwtToken = res.data;
        localStorage.setItem('jwtToken', jwtToken);
        window.location.href = 'http://localhost:3000/adminHome';
      })
      .catch((error) => {
        setError('Invalid username or password');
      });
  };

  return (
    <div className="regform">
      <h1>ADMIN LOGIN</h1>
      <form onSubmit={(e) => authenticateAdmin(e)}>
        User Name: <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} /><br /><br />
        Password: <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} /><br /><br />
        <input type="submit" value="Login" />
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default AdminLogin;