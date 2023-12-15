import { useNavigate, Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import FormHeading from './components/FormHeading';
import FormLabel from './components/FormLabel';
import FormInput from './components/FormInput';
import FormButton from './components/FormButton';
import styles from './Form.module.css';

const ForgotPassword = ({ token, setToken }) => {
	const navigate = useNavigate();

	useEffect(() => {
    const tokenCookie = Cookies.get('token');

    if (tokenCookie) {
      setToken(tokenCookie);
			navigate('/chats');
    } else {
      setToken(null);
    }
		console.log('updated in forgot password');
  });

  const [formData, setFormData] = useState({
    email: '',
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
			<form className={ styles.form } onSubmit={ handleSubmit }>
				<div className={ styles.formNav }>
					<Link to='/'>
						<span>Get Back</span>
					</Link>
					<Link to='/sign-in'>
						Sign In
					</Link>
				</div>

				<FormHeading
					text='Forgot Password ?'
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

				<FormButton
					text='Sign In'
				/>
			</form>
		</>
	);
}

export default ForgotPassword;