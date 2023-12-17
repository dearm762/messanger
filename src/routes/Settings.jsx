import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Cookies from 'js-cookie';

const Settings = ({ token, setToken }) => {
	const navigate = useNavigate();

	useEffect(() => {
    const tokenCookie = Cookies.get('token');
		console.log(tokenCookie);

    if (tokenCookie) {
      setToken(tokenCookie);
    } else {
      setToken(null);
			navigate('/');
    }
  });

	return (
		<>
			<h2>Settings page</h2>
		</>
	);
}

export default Settings;