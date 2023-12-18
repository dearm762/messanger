import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Send, Copy, ChevronLeft } from 'lucide-react';
import axios from 'axios';
import styles from './User.module.css';

const User = () => {
  const { id } = useParams();

	const navigate = useNavigate();

	const [userData, setUserData] = useState({
		name: '',
		surname: '',
		photo: '',
		username: ''
	});

  useEffect(() => {
    axios.post('https://clickme.kz/side-b/userinfo.post.php',
			{
				id: id,
			}
		).then(response => {
        console.log('Response Data:', response.data);
				setUserData({
					name: response.data.name,
					surname: response.data.surname,
					photo: response.data.photo,
					username: response.data.username,
				});
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, [id]);

  return (
    <>
			<button className={ styles.goBack } onClick={ () => navigate(-1) }>
				<ChevronLeft />
			</button>
      <img src={ `/${userData.photo}` } className={styles.avatar} />
      <div className={styles.line}>
        <h2 className={styles.name}>{ userData.surname } { userData.name }</h2>
        <button className={styles.pencilButton}>
          <Send />
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
};

export default User;