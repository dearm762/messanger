import React, { useState } from 'react';

const PhotoUploader = () => {
  const [token, setToken] = useState('');
  const [photo, setPhoto] = useState('');
  const [status, setStatus] = useState('');
  const [message, setMessage] = useState('');

  const handleTokenChange = (e) => {
    setToken(e.target.value);
  };

  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('token', token);
    formData.append('photo', photo);

    try {
      const response = await fetch('https://clickme.kz/side-b/update_avatar.post.php', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();
      setStatus(data.status);
      setMessage(data.message);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div>
      <h1>Photo Uploader</h1>
      <label>
        Token:
        <input type="text" value={token} onChange={handleTokenChange} />
      </label>
      <br />
      <label>
        Photo:
        <input type="file" onChange={handlePhotoChange} name/>
      </label>
      <br />
      <button onClick={handleSubmit}>Upload Photo</button>
      <br />
      <p>Status: {status}</p>
      <p>Message: {message}</p>
    </div>
  );
};

export default PhotoUploader;
