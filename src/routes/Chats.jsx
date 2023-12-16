import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Header from './components/Header';
import NavBar from './components/NavBar';

const Chats = ({ token, setToken }) => {
	const navigate = useNavigate();

	useEffect(() => {
    const tokenCookie = Cookies.get('token');

    if (tokenCookie) {
      setToken(tokenCookie);
    } else {
      setToken(null);
			navigate('/');
    }
		console.log('updated in chats');
  });
		
	return (
		<>
			<Header />
			<NavBar />
		</>
	);
}

export default Chats;