import TextField from '@mui/material/TextField';


const TextFieldBasic = ({ label, placeholder, type, onChange, name, value, rows, multiline, required, onBlur, ...rest }) => {
	return (
		<TextField
			fullWidth
			multiline={multiline}
			label={label}
			placeholder={placeholder}
			onChange={onChange}
			type={type}
			name={name}
			value={value}
			rows={rows}
			required={required}
			onBlur={onBlur}
			{...rest}
		/>
	)
}

export default TextFieldBasic