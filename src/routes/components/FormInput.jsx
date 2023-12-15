import styles from './FormInput.module.css';

const FormInput = ({ placeholder, type, id, name, value, onChange }) => {
	return (
		<>
			<input
				placeholder={ placeholder }
        type={ type }
        id={ id }
        name={ name }
       	value={ value }
        onChange={ onChange }
				className={ styles.formInput }
				required
				minLength={ name == 'password' ? '8' : '3' }
				maxLength={50}
      />
		</>
	);
}

export default FormInput;