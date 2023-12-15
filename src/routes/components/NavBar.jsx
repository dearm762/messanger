import { Link } from 'react-router-dom'
import { MessageCircleCode, ScanLine, Settings } from 'lucide-react';
import styles from './NavBar.module.css';

const NavBar = () => {
	return (
		<>
			<nav className={ styles.NavBar }>
				<Link to='/chats' className={ styles.navItem }>
					<MessageCircleCode width={24} />
					<span className={ styles.navText }>Chats</span>
				</Link>
				<Link to='/web' className={ styles.navItem }>
					<ScanLine width={24} />
					<span className={ styles.navText }>Scanner</span>
				</Link>
				<Link to='/settings' className={ styles.navItem }>
					<Settings width={24} />
					<span className={ styles.navText }>Settings</span>
				</Link>
			</nav>
		</>
	);
}

export default NavBar;