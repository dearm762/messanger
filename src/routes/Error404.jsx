import { Link } from 'react-router-dom';
import styles from './Error404.module.css';

const Error404 = () => {
	return (
		<>
			<div className={ styles.wrapper }>
				<h2 className={ styles.heading }>Error 404</h2>
				<p>Something went wrong...</p>
				<Link to='/' className={ styles.link }>/Home Page</Link>
			</div>
		</>
	);
}

export default Error404;