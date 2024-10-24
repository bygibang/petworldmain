import MobileStepper from '@mui/material/MobileStepper';

const styles = {
	'&.MuiPaper-root': {
		width: "100%",
		'.MuiLinearProgress-root': {
			width: "100%",
			height: "5px",
			borderRadius: "50px",
			backgroundColor: "#c1abe0",
			'.MuiLinearProgress-bar': {
				backgroundColor: "#5A00D6",
				borderRadius: "50px",
			}
		}
	}
}

const Stepper = ({ activeStep }) => {
	return (
		<MobileStepper
			sx={styles}
			variant="progress"
			steps={4}
			position="static"
			activeStep={activeStep}
		/>
	);
}

export default Stepper