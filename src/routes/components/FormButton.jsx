import styles from './FormButton.module.css';

const FormButton = ({ text }) => {
	return (
		<>
			<button
				className={ styles.formButton }
			>{ text }</button>
		</>
	);
}

export default FormButton;