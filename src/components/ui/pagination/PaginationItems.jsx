import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const PaginationItems = ({ handlePageChange, currentPage, totalPages }) => {

	return (
		<Stack spacing={2}>
			<Pagination
				count={totalPages}
				page={currentPage}
				onChange={handlePageChange}
				color="secondary"
			/>
		</Stack>
	);
}

export default PaginationItems