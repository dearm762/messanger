import { CircleDollarSign, Search } from 'lucide-react';
import styles from './Header.module.css';

const Header = () => {
	return (
		<>
			<header className={ styles.header }>
				<div className={ styles.headerLeft }>
					<CircleDollarSign width={ 20 } />
					<span className={ styles.logoText }>Ozimiz</span>
				</div>
				<div className={ styles.headerRight }>
					<Search width={ 20 } />
				</div>
			</header>
		</>
	);
}
export default Header;