import { AtSign, KeyRound, CircleUserRound, Contact2 } from 'lucide-react';
import styles from './FormLabel.module.css';

const FormLabel = ({ text, htmlFor }) => {
	return (
		<>
			<label 
				htmlFor={ htmlFor }
				className={ styles.formLabel }
			>
				{ htmlFor == 'name' && <CircleUserRound width={15} /> }
				{ htmlFor == 'surname' && <Contact2 width={15} /> }
				{ htmlFor == 'email' && <AtSign width={15} /> }
				{ htmlFor == 'password' && <KeyRound width={15} /> }
				{ text }:</label>
		</>
	);
}

export default FormLabel;