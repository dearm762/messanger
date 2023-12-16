import { useState } from 'react';
import axios from 'axios';
import { Paperclip, Smile, SendHorizontal } from 'lucide-react';
import useAuth from '../api/useAuth';
import styles from './Chat.module.css';

const Chat = ({ token, setToken }) => {
	const [messageData, setMessageData] = useState({
		messageText: ''
	});

	useAuth(token, setToken);

	const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMessageData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

	const handleSubmit = async (e) => {
    e.preventDefault();
		
    try {
      const response = await axios.post('https://clickme.kz/side-b/signin.post.php', {
				messageData: messageData
			}, {
					withCredentials: true
			});

			if(response.data.status === "success"){
				console.log('post res:', response.data);
			}
    } catch (error) {
      console.error('Error in POST request:', error);
    }
  };

	return (
		<>
			<form className={ styles.messageForm } onSubmit={ handleSubmit }>
				<button className={ styles.fileButton } type='button'>
					<Paperclip />
				</button>
				<input
					type="text"
					className={ styles.messageInput }
					value={ messageData.messageText }
					onChange={ handleInputChange }
					name='messageText'
					placeholder='Message'
				/>
				{
					messageData.messageText.length == 0
					? (
						<button className={ styles.smileButton } type='button'>
							<Smile />
						</button>
					) : (
						<button className={ styles.smileButton } type='submit'>
							<SendHorizontal />
						</button>
					)
				}
			</form>
		</>
	);
}

export default Chat;