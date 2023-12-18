import axios from 'axios';
import Cookies from 'js-cookie';

const postData = async (id, setSecondUserData, setMessages) => {
  try {
    const response = await axios.post(
      'https://clickme.kz/side-b/messages_chat.post.php',
      {
        token: Cookies.get('token'),
        chat_id: id
      },
      {
        withCredentials: true
      }
    );
    if (response.data.status === 'success') {
      console.log('post res:', response.data.messages);
      setSecondUserData({
        id: response.data.second_user.id,
        name: response.data.second_user.name,
        surname: response.data.second_user.surname,
        photo: response.data.second_user.photo
      });
      setMessages(response.data.messages);
    }
  } catch (error) {
    console.error('Error in POST request:', error);
  }
};

export default postData;