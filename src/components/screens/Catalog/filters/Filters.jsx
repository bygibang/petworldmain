import { age, animalBreed, documents, genders, health, location, petType, userType } from "../../../../services/options.service"
import SelectBasic from "../../../ui/fields/selectBasic/selectBasic"
import SelectCheckField from "../../../ui/fields/selectCheckField/SelectCheckField";
import TextFieldBasic from "../../../ui/fields/textFieldBasic/TextFieldBasic";
import CheckBox from "../../../ui/fields/checkBox/CheckBox";
import ButtonMain from '../../../ui/buttonMain/ButtonMain';
import CloseIcon from '@mui/icons-material/Close';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useDispatch, useSelector } from "react-redux";
import { resetFilters, updateFilter } from "../../../../store/filters/filtersSlice";

const Filters = ({ setHasFiltersApplied, handleApplyFilters }) => {
	const dispatch = useDispatch();
	const filters = useSelector((state) => state.filters);

	return (
		<form className="w-full h-full flex flex-col gap-4">
			{/* Animal Type */}
			<SelectBasic
				label="Вид тварин"
				list={petType}
				value={filters.petType || ''}
				name="petType"
				onChange={(e) => dispatch(updateFilter({ filterName: 'petType', filterValue: e.target.value }))}
			/>
			{/* Breed (Dynamic based on Animal Type) */}
			{filters.petType && (
				<SelectBasic
					label="Різновид"
					list={animalBreed[filters.petType] || []} // Get breed options based on selected pet type
					value={filters.breed || ''}
					name="breed"
					onChange={(e) => dispatch(updateFilter({ filterName: 'breed', filterValue: e.target.value }))}
				/>
			)}
			{/* Location */}
			<SelectBasic
				label="Локація"
				list={location}
				value={filters.location || ''}
				name="location"
				onChange={(e) => dispatch(updateFilter({ filterName: 'location', filterValue: e.target.value }))}
			/>
			{/* userType */}
			<SelectBasic
				label="Походження"
				list={userType}
				value={filters.userType || ''}
				name="documents"
				onChange={(e) => dispatch(updateFilter({ filterName: 'userType', filterValue: e.target.value }))}
			/>
			{/* Age */}
			<SelectBasic
				label="Вік"
				list={age}
				value={filters.age || ''}
				name="age"
				onChange={(e) => dispatch(updateFilter({ filterName: 'age', filterValue: e.target.value }))}
			/>
			{/* Price */}
			<div className="price-filters">
				<div className="flex gap-3">
					<TextFieldBasic
						label="Мін ціна"
						type="number"
						value={filters.minPrice} // Use filters.minPrice for value
						onChange={(e) => dispatch(updateFilter({ filterName: 'minPrice', filterValue: e.target.value }))}
						sx={{ marginRight: 2 }}
					/>
					<TextFieldBasic
						label="Макс ціна"
						type="number"
						value={filters.maxPrice} // Use filters.maxPrice for value
						onChange={(e) => dispatch(updateFilter({ filterName: 'maxPrice', filterValue: e.target.value }))}
					/>
				</div>
				<CheckBox
					checked={filters.isFree} // Use filters.isFree for value
					onChange={(e) => dispatch(updateFilter({ filterName: 'isFree', filterValue: e.target.checked }))}
					label="Безкоштовно"
				/>
			</div>
			{/* Gender */}
			<SelectBasic
				label="Стать"
				list={genders}
				value={filters.gender || ''}
				name="gender"
				onChange={(e) => dispatch(updateFilter({ filterName: 'gender', filterValue: e.target.value }))}
			/>
			{/* Health */}
			<SelectCheckField
				label="Здоров'я"
				list={health}
				value={filters.health} // Pass the health filter value
				name="health"
				onChange={(newValue) => dispatch(updateFilter({ filterName: 'health', filterValue: newValue }))}
			/>
			{/* Documents */}
			<SelectCheckField
				label="Документи"
				list={documents}
				value={filters.documents} // Pass the documents filter value
				name="documents"
				onChange={(newValue) => dispatch(updateFilter({ filterName: 'documents', filterValue: newValue }))}
			/>
			<div className="w-full flex flex-col gap-3">
				<ButtonMain
					onClick={handleApplyFilters}
					title="Застовувати фільтри"
					icon={<FilterListIcon />}
				/>
				<ButtonMain
					onClick={(e) => {
						e.preventDefault()
						dispatch(resetFilters());
						setHasFiltersApplied(false); // Update component state
					}}
					title="Очистити фільтри"
					icon={<CloseIcon />}
				/>
			</div>
		</form>
	);
};

export default Filters;