import Autocomplete from '@mui/material/Autocomplete';
import { location } from '../../../../services/options.service';
import { TextField } from '@mui/material';
import { useState } from 'react';


const SelectLocation = ({ name, value, onChange, onBlur }) => {
	const [valueDef, setValueDef] = useState(value);
	const [inputValue, setInputValue] = useState('');

	return (
		<Autocomplete
			fullWidth
			onBlur={onBlur}
			disablePortal
			value={valueDef}
			name={name}
			onChange={(event, newValue) => {
				setValueDef(newValue);
				onChange(newValue)
			}}
			inputValue={inputValue}
			onInputChange={(event, newInputValue) => {
				setInputValue(newInputValue);
			}}
			options={location}
			renderInput={(params) => <TextField {...params} label="Локація" />}
		/>
	);
}

export default SelectLocation