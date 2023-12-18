import { Link } from 'react-router-dom';
import styles from './ChatCard.module.css';

const ChatCard = ({ chat }) => {
  return (
    <>
      <Link className={styles.chatsCard} to={`/chat/${chat.chat_id}#last`}>
        <img src={ chat.photo } alt="" className={ styles.avatar } />
        <div className={styles.info}>
          <h2 className={styles.userInfo}>
            <span className={styles.userdata}>{chat.name} {chat.surname}</span>
            <span className={styles.messageTime}>{chat.last_message_time.substring(0, 5)}</span>
          </h2>
          <p className={styles.lastMessage}>{chat.last_message}</p>
        </div>
      </Link>
    </>
  );
}

export default ChatCard;
