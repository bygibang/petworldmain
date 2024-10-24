import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';



const RadioButtons = ({ list, label, name, onChange, value }) => {
	return (
		<>
			<FormLabel id="demo-radio-buttons-group-label">{label}</FormLabel>
			<RadioGroup
				row
				fullWidth
				aria-labelledby="demo-radio-buttons-group-label"
				value={value}
				onChange={onChange}
				name={name}
			>
				{list.map((item) => (
					<FormControlLabel key={item} value={item} control={<Radio />} label={item} />
				))}
			</RadioGroup>
		</>
	)
}

export default RadioButtons