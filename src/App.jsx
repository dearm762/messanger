import { Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import Home from './routes/Home';
import Chats from './routes/Chats';
import SignIn from './routes/SignIn';
import SignUp from './routes/SignUp';
import ForgotPassword from './routes/ForgotPassword';
import Settings from './routes/Settings';
import Chat from './routes/Chat';
import Error404 from './routes/Error404';
import PhotoUploader from './routes/test';

const App = () => {
	const [token, setToken] = useState(null);
	return (
		<Routes>
			<Route path='/' element={ <Home token={ token } setToken={ setToken } /> } />
			<Route path='/chats' element={ <Chats token={ token } setToken={ setToken } /> } />
			<Route path='/test' element={ <PhotoUploader token={ token } setToken={ setToken } /> } />
			<Route path='/sign-in' element={ <SignIn token={ token } setToken={ setToken } /> } />
			<Route path='/sign-up' element={ <SignUp token={ token } setToken={ setToken } /> } />
			<Route path='/forgot-password' element={ <ForgotPassword token={ token } setToken={ setToken } /> } />
			<Route path='/settings' element={ <Settings token={ token } setToken={ setToken } /> } />
			<Route path='/chat/:id' element={ <Chat token={ token } setToken={ setToken } /> } />
			<Route path='*' element={ <Error404 /> } />
		</Routes>
	);
}

export default App;