import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const SelectBasicAge = ({ list, label, name, value, onChange}) => {
	return (
		<Box sx={{ maxWidth: 225, width: '100%', height: "100%" }}>
			<FormControl fullWidth>
				<InputLabel id="demo-simple-select-label" >{label}</InputLabel>
				<Select
					required
					labelId="demo-simple-select-label"
					id="demo-simple-select"
					name={name}
					value={value}
					label={label}
					onChange={(event) => {
						onChange(event.target.value);
					 }}
				>
					{list.map((item) => (
						<MenuItem key={item} value={item}>{item}</MenuItem>
					))}
				</Select>
			</FormControl>
		</Box>
	);
}

export default SelectBasicAge