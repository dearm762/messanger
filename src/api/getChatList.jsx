import axios from 'axios';

export const fetchChats = async (token) => {
  try {
    const response = await axios.post(
      'https://clickme.kz/side-b/user_chats.post.php',
      { token },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    if (response.data.message == 'Сhats found') {
      return response.data.chats;
    } else {
      return [];
    }
    
  } catch (error) {
    console.error('Error:', error.message);
    return [];
  }
};