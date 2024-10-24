import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const styles = {
	"&.MuiBox-root": {
		width: "100%"
	},
	"&.Mui-selected": {
		backgroundColor: "#9786E3"
	},
	"&.MuiButtonBase-root:hover": {
		backgroundColor: "#F7F2FD"
	},
	"&.MuiFormLabel-root": {
		color: "#3B3B3B"
	},
	"&.Mui-focused": {
		borderColor: "#9786E3"
	}
}

const SelectBasic = ({ list, label, name, value, onChange, required }) => {
	return (
		<Box sx={styles}>
			<FormControl fullWidth sx={styles}>
				<InputLabel id="demo-simple-select-label" sx={styles}>{label}</InputLabel>
				<Select
					sx={styles}
					required={required}
					labelId="demo-simple-select-label"
					id="demo-simple-select"
					name={name}
					value={value}
					label={label}
					onChange={onChange}
				>
					{list.map((item) => (
						<MenuItem key={item} value={item} sx={styles}>{item}</MenuItem>
					))}
				</Select>
			</FormControl>
		</Box>
	);
}

export default SelectBasic