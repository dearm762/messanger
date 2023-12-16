import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import FormHeading from './components/FormHeading';
import FormLabel from './components/FormLabel';
import FormInput from './components/FormInput';
import FormButton from './components/FormButton';
import styles from './Form.module.css';

const SignIn = ({ token, setToken }) => {
  const navigate = useNavigate();

  const [error,setError] = useState("");

  useEffect(() => {
    const tokenCookie = Cookies.get('token');

    if (tokenCookie) {
      setToken(tokenCookie);
      navigate('/chats');
    } else {
      setToken(null);
    }
    console.log('updated in Sign in');
  }, [setToken, navigate]);

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);

    try {
      const response = await axios.post('https://clickme.kz/side-b/signin.post.php', {
				email: formData.email,
				password: formData.password
		}, {
				withCredentials: true
		});

    if(response.data.status === "success"){

      console.log('POST Response:', response.data);
      Cookies.set('token', response.data.token, { expires: 7 });
      navigate('/chats');

    }else{
      setError(response.data.message);
      console.log('POST Response:', response.data);
    }
      
    } catch (error) {
      console.error('Error in POST request:', error);
    }
  };

  return (
    <>
      <form className={styles.form} onSubmit={ handleSubmit }>
        <div className={styles.formNav}>
          <Link to='/'>
            <span>Get Back</span>
          </Link>
          <Link to='/sign-up'>Sign Up</Link>
        </div>

        <FormHeading text='Welcome back:' htmlFor='email' />

        <FormLabel text='Email' htmlFor='email' />

        <FormInput
          placeholder='example@domain.com'
          type='email'
          id='email'
          name='email'
          value={ formData.email }
          onChange={ handleInputChange }
        />

        <FormLabel text='Password' htmlFor='password' />

        <FormInput
          placeholder='********'
          type='password'
          id='password'
          name='password'
          value={ formData.password }
          onChange={ handleInputChange }
        />

        <Link className={styles.toForgot} to='/forgot-password'>
          Forgot password?
        </Link>

        {
          error && <p className={ styles.errorMessage }>{ error }</p>
        }

        <FormButton text='Sign In' />
      </form>
    </>
  );
};

export default SignIn;