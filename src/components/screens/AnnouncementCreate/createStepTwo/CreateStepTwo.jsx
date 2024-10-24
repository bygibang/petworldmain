import { ageTypeOptions, animalBreed, documents, genders, health } from "../../../../services/options.service"
import RadioButtons from "../../../ui/fields/radioButtons/RadioButtons"
import SelectBasic from "../../../ui/fields/selectBasic/selectBasic"
import SelectCheckField from "../../../ui/fields/selectCheckField/SelectCheckField"
import TextFiledBasic from "../../../ui/fields/textFieldBasic/TextFieldBasic"
import SelectBasicAge from "../../../ui/fields/selectBasic/SelectBasicAge"

const CreateStepTwo = ({ formData, handleFormData }) => {

	const handleChange = (e) => {
		const { name, value } = e.target;
		handleFormData({ ...formData, [name]: value });
	};

	const handleCheckFieldChange = (name, newValue) => {
		handleFormData({ ...formData, [name]: newValue });
	};

	const handleChangeAgeType = (newValue) => {
		handleFormData({
			...formData,
			age: {
				value: formData.age.value,
				type: newValue
			}
		});
	};

	const handleChangeAgeValue = (event) => {
		const { name, value } = event.target;
		if (name === 'age') {
			handleFormData({
				...formData,
				age: {
					value: parseInt(value, 10),
					type: formData.age.type
				}
			});
		}
	};

	const animalBreedOptions = formData.petType ? animalBreed[formData.petType] : [];

	return (
		<>
			<div className="flex flex-col gap-5">
				<SelectBasic label="Рiзновид" list={animalBreedOptions} value={formData.breed} name="breed" onChange={handleChange} />
				<form className="flex gap-3">
					<TextFiledBasic label="Вiк" type="number" value={formData.age.value} name="age" onChange={handleChangeAgeValue} slotProps={{
						input: {
							inputProps: { min: 0, max:12 },
						},
					}} />
					<SelectBasicAge list={ageTypeOptions} value={formData.age.type} name="ageType" onChange={handleChangeAgeType} />
				</form>
				<RadioButtons list={genders} name="gender" value={formData.gender} onChange={handleChange} label="Стать" />
				<SelectCheckField label="Здоровʼя" list={health} name='health' value={formData.health} onChange={(newValue) => handleCheckFieldChange('health', newValue)} />
				<SelectCheckField label="Документи" list={documents} name='documents' value={formData.documents} onChange={(newValue) => handleCheckFieldChange('documents', newValue)} />
			</div>
		</>

	)
}

export default CreateStepTwo