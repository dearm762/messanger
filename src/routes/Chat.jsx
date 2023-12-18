import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Paperclip, Smile, SendHorizontal, ArrowLeft, MoreVertical } from 'lucide-react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import useAuth from '../api/useAuth';
import Cookies from 'js-cookie';
import styles from './Chat.module.css';
import postData from '../api/getMessages';

const Chat = ({ token, setToken }) => {
  const { id } = useParams('id');
  useAuth(token, setToken);
  const navigate = useNavigate();

  const [messageData, setMessageData] = useState({
    messageText: ''
  });

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
      const response = await axios.post('https://clickme.kz/side-b/message.post.php', {
        token: Cookies.get('token'),
        chat_id: id,
        message: messageData.messageText
      }, {
        withCredentials: true
      });
      if (response.data.status === "success") {
        console.log('post res:', response.data);
        // Optionally, you can fetch and update messages here as well after posting a new message
      }
    } catch (error) {
      console.error('Error in POST request:', error);
    }
  };

  const [messages, setMessages] = useState([]);

  const [secondUserData, setSecondUserData] = useState({
    id: '2',
    name: '',
    surname: ''
  });

  useEffect(() => {
    postData(id, setSecondUserData, setMessages);

    const intervalId = setInterval(() => {
      postData(id, setSecondUserData, setMessages);
    }, 3000);

    return () => clearInterval(intervalId);
  }, [id]);

  return (
    <>
      <header className={styles.chatHeader}>
        <Link className={styles.backButton} to='/chats'>
          <ArrowLeft />
        </Link>
        <button className={styles.userProfile} onClick={() => navigate(`user/${secondUserData.id}`)}>
          <img src="/ava.test.jpg" alt="" className={styles.avatar} />
          <span>{secondUserData.surname} {secondUserData.name}</span>
        </button>
        <button className={styles.menu}>
          <MoreVertical />
        </button>
      </header>

      <main className={styles.chatsContainer}>
        {messages.map((message) => (
          <div className={secondUserData.id == message.sender ? styles.mine : styles.notMine} key={message.id}>
            <span>{message.message}</span>
            <span className={styles.time}>{message.date_time.substring(0, 5)}</span>
          </div>
        ))}
      </main>

      <form className={styles.messageForm} onSubmit={handleSubmit}>
        <button className={styles.fileButton} type='button'>
          <Paperclip />
        </button>
        <input
          type="text"
          className={styles.messageInput}
          value={messageData.messageText}
          onChange={handleInputChange}
          name='messageText'
          placeholder='Message'
        />
        {messageData.messageText.length === 0 ? (
          <button className={styles.smileButton} type='button'>
            <Smile />
          </button>
        ) : (
          <button className={styles.smileButton} type='submit'>
            <SendHorizontal />
          </button>
        )}
      </form>
    </>
  );
};

export default Chat;