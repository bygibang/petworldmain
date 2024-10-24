import { useEffect, useState } from "react";
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Box, Chip, useTheme } from "@mui/material";


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
		},
	},
};

function getStyles(name, personName, theme) {
	return {
		fontWeight: personName.includes(name)
			? theme.typography.fontWeightMedium
			: theme.typography.fontWeightRegular,
	};
}


const SelectCheckField = ({ list, label, name, value, onChange, required }) => {
	const theme = useTheme();
	const [optionsValue, setOptionsValue] = useState(value || []);

	const handleChange = (event) => {
		const {
			target: { value },
		} = event;
		setOptionsValue(
			typeof value === 'string' ? value.split(',') : value,
		);
	};

	useEffect(() => {
		onChange(optionsValue)
	}, [optionsValue])

	return (
		<div>
			<FormControl sx={{ width: "100%" }}>
				<InputLabel id="demo-multiple-chip-label">{label}</InputLabel>
				<Select
					required={required}
					labelId="demo-multiple-chip-label"
					id="demo-multiple-chip"
					fullWidth
					multiple
					name={name}
					value={optionsValue}
					onChange={handleChange}
					input={<OutlinedInput id="select-multiple-chip" label={label} />}
					renderValue={(selected) => (
						<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
							{selected.map((value) => (
								<Chip key={value} label={value} />
							))}
						</Box>
					)}
					MenuProps={MenuProps}
				>
					{list.map((item) => (
						<MenuItem
							key={item}
							value={item}
							name={item}
							style={getStyles(item, optionsValue, theme)}
						>
							{item}
						</MenuItem>
					))}
				</Select>
			</FormControl>
		</div>
	);
}

export default SelectCheckField