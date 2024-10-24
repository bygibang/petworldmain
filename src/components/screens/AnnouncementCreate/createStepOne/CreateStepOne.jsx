import { InputAdornment } from "@mui/material"
import { petType, userType } from "../../../../services/options.service"
import SelectBasic from "../../../ui/fields/selectBasic/selectBasic"
import SelectLocation from "../../../ui/fields/selectLocation/SelectLocation"
import TextFiledBasic from "../../../ui/fields/textFieldBasic/TextFieldBasic"
import RadioButtons from "../../../ui/fields/radioButtons/RadioButtons"

const CreateStepOne = ({ formData, handleFormData }) => {

	const handleChange = (e) => {
		const { name, value } = e.target;
		handleFormData({ ...formData, [name]: value });
	};

	const handleLocationChange = (newValue) => {
		handleFormData({ ...formData, location: newValue });
	};

	const handlePriceChange = (e) => {
		const { name, value } = e.target;
		handleFormData((prevFormData) => ({
			...prevFormData,
			[name]: value ? parseFloat(value) : 0, // Convert to number if not empty
		}));
	};

	return (
		<>
			<div className="flex flex-col gap-5">
				<TextFiledBasic label="Назва оголошення" placeholder="Введiть назву оголошення" name="title" value={formData.title} onChange={handleChange} />
				<SelectBasic label="Вид тварини" list={petType} name="petType" value={formData.petType} onChange={handleChange} />
				<TextFiledBasic value={formData.price} label="Цiна" placeholder="Введiть цiну" type="number" min="0" name="price" onChange={handlePriceChange} slotProps={{
					input: {
						startAdornment: <InputAdornment position="start">₴</InputAdornment>,
						inputProps: { min: 0 }
					},
				}} />
				<SelectLocation name="location" value={formData.location} onChange={handleLocationChange} />
				<RadioButtons list={userType} name="userType" value={formData.userType} onChange={handleChange} label="Походження тварини" />
			</div>
		</>
	)
}

export default CreateStepOne