import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const CheckBox = ({ label, children, checked, value, required, onChange }) => {
	return (
		<FormGroup>
			<FormControlLabel control={<Checkbox
				required={required}
				value={value}
				checked={checked}
				onChange={onChange}
				sx={{
					color: "#5A00D6",
					'&.Mui-checked': {
						color: "#5A00D6",
					},
				}}
			/>}
				label={label} />
			{children}
		</FormGroup>
	)
}

export default CheckBox