import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { Pencil, Copy, ChevronLeft, MoreVertical } from 'lucide-react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import styles from './Settings.module.css';

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

	const [userData, setUserData] = useState({
		name: 'Abdurrauf',
		surname: 'Sakenov',
		photo: 'default.jpg',
		username: 'dev'	
	});

	return (
		<>
			<button className={ styles.goBack } onClick={ () => navigate(-1) }>
				<ChevronLeft />
			</button>
			<button className={ styles.options }>
				<MoreVertical />
			</button>
      <img src={ `/${userData.photo}` } className={styles.avatar} />
      <div className={styles.line}>
        <h2 className={styles.name}>{ userData.surname } { userData.name }</h2>
        <button className={styles.pencilButton} onClick={ () => navigate('/settings/name') }>
          <Pencil />
        </button>
      </div>
      <div className={styles.line}>
        <span className={styles.username}>@{ userData.username }</span>
        <button className={styles.copyButton}>
          <Copy />
        </button>
      </div>
		</>
	);
}

export default Settings;

// https://clickme.kz/side-b/setting.get.php