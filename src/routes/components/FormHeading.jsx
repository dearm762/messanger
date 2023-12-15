import styles from './FormHeading.module.css';

const FormHeading = ({ text }) => {
	return (
		<>
			<h2 
				className={ styles.formHeading }
			>{ text }</h2>
		</>
	);
}

export default FormHeading;