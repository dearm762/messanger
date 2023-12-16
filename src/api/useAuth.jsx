import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const useAuth = (token, setToken) => {
  const navigate = useNavigate();
  useEffect(() => {
    const tokenCookie = Cookies.get('token');
    if (tokenCookie) {
      setToken(tokenCookie);
    } else {
      setToken(null);
      navigate('/');
    }
  }, [token, setToken, navigate]);
};

export default useAuth;