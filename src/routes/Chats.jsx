import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import Header from './components/Header';
import NavBar from './components/NavBar';
import ChatCard from './components/ChatCard';
import styles from './Chats.module.css';
import { fetchChats } from '../api/getChatList';
import useAuth from '../api/useAuth';

const Chats = ({ token, setToken }) => {
  useAuth(token, setToken);
	
  const [list, setList] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      const chats = await fetchChats(Cookies.get('token'));
      setList(chats);
    };
    fetchData();
  }, []);

  return (
    <>
      <Header />
      <main className={styles.chatsContainer}>
        {
					list.length == 0
					? ( <p className={ styles.emptyCase }>Start chatting by clicking pencil button</p> )
					: ( list.map( (chat) => <ChatCard chat={chat} key={chat.chat_id} /> ) )
				}
      </main>
      <NavBar />
    </>
  );
};

export default Chats;