import { Check, ChevronLeft } from 'lucide-react';
import styles from './SetName.module.css';
import { useNavigate } from 'react-router-dom';

const SetName = () => {
	const navigate = useNavigate();

	return (
		<>
			<header className={ styles.header }>
				<button className={ styles.goBack } onClick={ () => navigate('/settings') }>
					<ChevronLeft />
				</button>
				<span className={ styles.headerText }>Edit name</span>
				<button className={ styles.goBack }>
					<Check />
				</button>
			</header>
			<form className={ styles.form }>
				<input type="text" className={ styles.formInput } placeholder='First name' />
				<input type="text" className={ styles.formInput } placeholder='Last name' />
			</form>
		</>
	);
}

export default SetName;