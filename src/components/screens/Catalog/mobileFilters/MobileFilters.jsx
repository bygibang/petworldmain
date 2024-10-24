import { Drawer } from "@mui/material";
import { useState } from "react";
import Filters from "../filters/Filters";


const styles = {
	'.MuiPaper-root': {
		width: "250px",
		padding: "10px",
	},
	".MuiPaper-root button": {
		width: '100%',
		display: 'flex',
		alignItems: 'center',
		gap: '10px',
		backgroundColor: '#5A00D6',
		color: '#FCFCFF',
		padding: '10px 15px 10px 15px',
		borderRadius: '50px',
		margin: '10px 0'
	},
	'.MuiInputBase-root': {
		marginBottom: '10px'
	}
}


const MobileFilters = ({ setHasFiltersApplied, handleApplyFilters }) => {
	const [open, setOpen] = useState(false);

	const toggleDrawer = (newOpen) => () => {
		setOpen(newOpen);
	};

	return (
		<div className="w-full h-full hidden max-lg:block text-right mb-5">
			<button onClick={toggleDrawer(true)} className="text-xl font-medium border border-text_grey-200/50 py-2 px-4 rounded-md max-extramd:w-full">Фільтри</button>
			<Drawer open={open} onClose={toggleDrawer(false)} sx={styles}>
				<Filters
					handleApplyFilters={handleApplyFilters}
					setHasFiltersApplied={setHasFiltersApplied}
				/>
			</Drawer>
		</div>
	)
}

export default MobileFilters