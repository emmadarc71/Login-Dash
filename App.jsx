import React, { useState } from 'react';
import LoginForm from './components/LoginForm';


const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState('');

  const handleLogin = (email, password) => {
    if (email === 'student@example.com' && password === 'react123') {
      setIsLoggedIn(true);
      setLoginError('');
    } else {
      setLoginError('Invalid credentials. Please use student@example.com / react123');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setLoginError('');
  };

  return (
    <div className="app">
      {!isLoggedIn ? (
        <LoginForm onLogin={handleLogin} loginError={loginError} />
      ) : (
        <Dashboard onLogout={handleLogout} />
      )}
    </div>
  );
};

export default App;