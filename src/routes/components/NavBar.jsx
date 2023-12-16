import { useNavigate } from 'react-router-dom'
import { MessageCircleCode, ScanLine, Settings } from 'lucide-react';
import styles from './NavBar.module.css';

const NavBar = () => {
	const navigate = useNavigate();
	return (
		<>
			<nav className={ styles.NavBar }>
				<button className={ styles.navItem } onClick={ () => navigate('/chats') }>
					<MessageCircleCode width={24} />
					<span className={ styles.navText }>Chats</span>
				</button>

				<button className={ styles.navItem } onClick={ () => navigate('/web') }>
					<ScanLine width={24} />
					<span className={ styles.navText }>Scanner</span>
				</button>

				<button className={ styles.navItem } onClick={ () => navigate('/settings') }>
					<Settings width={24} />
					<span className={ styles.navText }>Settings</span>
				</button>
			</nav>
		</>
	);
}

export default NavBar;