import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';

const Loader = () => {
	return (
			<Stack spacing={2} direction="row" alignItems="center">
				<CircularProgress size={40} />
			</Stack>
	)
}

export default Loader