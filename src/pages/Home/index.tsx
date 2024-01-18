
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import LoginForm from './../../components/Auth/Login';
import RegisterForm from './../../components/Auth/Register';
import { useAuth } from './../../context/AuthContext';

const Home: React.FC = () => {
  const { isAuthenticated, login, logout } = useAuth();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState<boolean>(true);

  const handleLoginSuccess = (token: string) => {
    login(token);
    navigate('/category');
  };

  const handleRegisterSuccess = () => {
    setIsLogin(true);
  };

  return (
    <div>
      {isAuthenticated ? (
        // Render sesuai kebutuhan jika pengguna sudah login
        <div>
          <p>Welcome, user!</p>
          <p><Link to="/category">Go to Category</Link></p>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        // Render form login/register jika pengguna belum login
        <>
          {isLogin ? (
            <>
              <LoginForm onLoginSuccess={handleLoginSuccess} />
              <p>
                Don't have an account?{' '}
                <button onClick={() => setIsLogin(false)}>Register</button>
              </p>
            </>
          ) : (
            <>
              <RegisterForm onRegisterSuccess={handleRegisterSuccess} />
              <p>
                Already have an account?{' '}
                <button onClick={() => setIsLogin(true)}>Login</button>
              </p>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Home;