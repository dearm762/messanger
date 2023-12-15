import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import FormHeading from './components/FormHeading';
import FormLabel from './components/FormLabel';
import FormInput from './components/FormInput';
import FormButton from './components/FormButton';
import styles from './Form.module.css';

const SignUp = ({ token, setToken }) => {
	const navigate = useNavigate();

	useEffect(() => {
    const tokenCookie = Cookies.get('token');

    if (tokenCookie) {
      setToken(tokenCookie);
			navigate('/chats');
    } else {
      setToken(null);
    }
		console.log('updated in Sign Up');
  });

	const [formData, setFormData] = useState({
		name: '',
		surname: '',
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
  };

	return (
		<>
			<form className={styles.form} onSubmit={handleSubmit}>
				<div className={ styles.formNav }>
					<Link to='/'>
						<span>Get Back</span>
					</Link>
					<Link to='/sign-in'>
						Sign In
					</Link>
				</div>
        <FormHeading 
					text='Welcome to Ozimiz:'
					htmlFor='email'
				/>

				<FormLabel
					text='Name'
					htmlFor='name'
				/>

				<FormInput
					placeholder='Abdurrauf'
					type="text"
          id="name"
          name="name"
					value={ formData.name }
        	onChange={ handleInputChange }
				/>

				<FormLabel
					text='Surname'
					htmlFor='surname'
				/>

				<FormInput
					placeholder='Sakenov'
					type="text"
          id="surname"
          name="surname"
					value={ formData.surname }
        	onChange={ handleInputChange }
				/>

				<FormLabel
					text='Email'
					htmlFor='email'
				/>

				<FormInput
					placeholder='example@domain.com'
					type="email"
          id="email"
          name="email"
					value={ formData.email }
        	onChange={ handleInputChange }
				/>

				<FormLabel
					text='Password'
					htmlFor='password'
				/>

				<FormInput
					placeholder='********'
					type="password"
          id="password"
          name="password"
					value={ formData.password }
        	onChange={ handleInputChange }
				/>

				<Link className={ styles.toForgot } to='/forgot-password'>Forgot password?</Link>

				<FormButton
					text='Sign Up'
				/>
      </form>
		</>
	);
}

export default SignUp;