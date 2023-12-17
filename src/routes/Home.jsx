import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import styles from './Home.module.css';

const Home = ({ token, setToken }) => {
	const navigate = useNavigate();

	useEffect(() => {
    const tokenCookie = Cookies.get('token');

    if (tokenCookie) {
      setToken(tokenCookie);
			navigate('/chats');
    } else {
      setToken(null);
    }
  });

  const [headingText, setHeadingText] = useState('');

  useEffect(() => {
		if (headingText === '') {
			const textToDisplay = 'Private Chat';
			let currentIndex = 0;

			const intervalId = setInterval(() => {
				setHeadingText((prevText) => {
					if (currentIndex < textToDisplay.length) {
						return prevText + textToDisplay[currentIndex++];
					} else {
						clearInterval(intervalId);
						return prevText;
					}
				});
			}, 350);

    	return () => clearInterval(intervalId);
		}
  }, []);

  return (
    <>
			<div className={ styles.container }>
				<h2 className={ styles.heading }>{ headingText }</h2>
				{
					(headingText === 'Private Chat') && (
						<ul className={ styles.hiddenList }>
							<li>Privacy First</li>
							<li>User-Friendly</li>
							<li>Customization</li>
							<li>Smart Notifications</li>
							<li>Media Sharing</li>
						</ul>
					)
				} {
					(headingText === 'Private Chat') && (
						<button
							className={ styles.authButton }
							onClick={ () => navigate('sign-in') }
						>Get Started</button>	
					)
				}
			</div>
    </>
  );
};

export default Home;