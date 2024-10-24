import { InputAdornment } from "@mui/material"
import RadioButtons from "../../ui/fields/radioButtons/RadioButtons"
import SelectBasic from "../../ui/fields/selectBasic/selectBasic"
import SelectCheckField from "../../ui/fields/selectCheckField/SelectCheckField"
import TextFiledBasic from "../../ui/fields/textFieldBasic/TextFieldBasic"
import SelectLocation from "../../ui/fields/selectLocation/SelectLocation"
import { ageTypeOptions, animalBreed, documents, genders, health, petType, userType } from "../../../services/options.service"
import { useRef, useState } from "react"
import ButtonMain from "../../ui/buttonMain/ButtonMain"
import SelectBasicAge from "../../ui/fields/selectBasic/SelectBasicAge"
import { doc, updateDoc } from "firebase/firestore"
import { db } from "../../../services/firebase.service"
import { useNavigate, useParams } from "react-router-dom"
import { popupAlert } from "../../../services/popupAlert.service"
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage"
import { DragDropContext } from "react-beautiful-dnd"
import SortableBox from "../AnnouncementCreate/createStepThird/sortableImages/SortableBox"
import { v4 as uuidv4 } from 'uuid'




const EditAnnouncement = ({ announcement, handleIsEditing, editedData, handleEditedData }) => {
	const router = useNavigate()
	const { id } = useParams();
	const animalBreedOptions = editedData.petType ? animalBreed[editedData.petType] : [];
	const [files, setFiles] = useState([]);
	const [imageURLs, setImageURLs] = useState(announcement.images); // Initialize with existing images
	const hiddenFileInput = useRef(null);
	const storage = getStorage();

	const handleFileChange = async (event) => {
		const file = event.target.files[0];
		setFiles((prevFiles) => [...prevFiles, file]);
		const blob = new Blob([file], { type: file.type });
		const filename = `${uuidv4()}-${file.name}`; // Generate a unique filename
		const imageRef = ref(storage, `images/${filename}`); // Reference to the image in Storage
		// Upload the new image to Storage
		const uploadTask = uploadBytesResumable(imageRef, blob);
		uploadTask.on(
			'state_changed',
			(snapshot) => {
				// Optional: Track upload progress
				const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
			},
			(error) => {
				// Handle errors
				console.error("Error uploading image:", error);
			},
			() => {
				// Get the download URL from Storage
				getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
					setImageURLs((prevImageURLs) => [...prevImageURLs, downloadURL]);
					handleEditedData({ ...editedData, images: [...editedData.images, downloadURL] });
				});
			}
		);
	};


	const handleClickOnFileButton = () => {
		hiddenFileInput.current.click();
	};

	const handleOnDragEnd = (result) => {
		if (!result.destination) return;
		const items = Array.from(imageURLs);
		const [reorderedItem] = items.splice(result.source.index, 1);
		items.splice(result.destination.index, 0, reorderedItem);
		setImageURLs(items);
		handleEditedData({ ...editedData, images: items });
	};

	const handleSaveClick = async () => {
		try {
			const announcementRef = doc(db, 'announcements', id);
			await updateDoc(announcementRef, editedData);
			router("/profile");
			popupAlert('Оголошення змінено', "Вим можете преглянути його в особистому кабінеті", "success");
		} catch (error) {
			console.error("Error saving announcement:", error);
		}
	};

	const handleChange = (event) => {
		const { name, value } = event.target;
		handleEditedData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleChangeAgeValue = (event) => {
		const { value } = event.target;
		handleEditedData((prevData) => ({
			...prevData,
			age: {
				...prevData.age,
				value: value,
			},
		}));
	};

	const handleLocationChange = (newValue) => {
		handleEditedData((prevData) => ({
			...prevData,
			location: newValue,
		}));
	};

	const handleCheckFieldChange = (fieldName, newValue) => {
		handleEditedData((prevData) => ({
			...prevData,
			[fieldName]: newValue,
		}));
	};

	const handleChangeAgeType = (newValue) => {
		handleEditedData((prevData) => ({
			...prevData,
			age: {
				...prevData.age,
				type: newValue,
			},
		}));
	};

	return (
		<>
			<div className="flex flex-col gap-5">
				<TextFiledBasic label="Назва оголошення" placeholder="Введiть назву оголошення" name="title" value={editedData.title} onChange={handleChange} />
				<TextFiledBasic label="Додаткова інформація" placeholder="Введiть текст" name="description" value={editedData.description} onChange={handleChange} rows={7} multiline={true} />
				<TextFiledBasic label="Цiна" placeholder="Введiть цiну" type="number" min="0" value={editedData.price} name="price" onChange={handleChange} slotProps={{
					input: {
						startAdornment: <InputAdornment position="start">₴</InputAdornment>,
						inputProps: { min: 0 }
					},
				}} />
				<SelectBasic label="Вид тварини" list={petType} name="petType" value={editedData.petType} onChange={handleChange} />
				<SelectBasic label="Рiзновид" list={animalBreedOptions} value={editedData.breed} name="breed" onChange={handleChange} />
				<RadioButtons list={genders} name="gender" value={editedData.genders} onChange={handleChange} label="Стать" />
				<div className="flex items-center gap-5">
					<TextFiledBasic label="Вiк" type="number" value={editedData.age.value} name="age" onChange={handleChangeAgeValue} slotProps={{
						input: {
							inputProps: { min: 0 }
						},
					}} />
					<SelectBasicAge list={ageTypeOptions} value={editedData.age.type} name="ageType" onChange={handleChangeAgeType} />
				</div>
				<SelectLocation name="location" value={editedData.location} onChange={handleLocationChange} />
				<RadioButtons list={userType} name="userType" value={editedData.userType} onChange={handleChange} label="Походження тварини" />
				<SelectCheckField label="Здоровʼя" list={health} name='health' value={editedData.health} onChange={(newValue) => handleCheckFieldChange('health', newValue)} />
				<SelectCheckField label="Документи" list={documents} name='documents' value={editedData.documents} onChange={(newValue) => handleCheckFieldChange('documents', newValue)} />
				<div>
					<DragDropContext onDragEnd={handleOnDragEnd}>
						<SortableBox files={files} imageURLs={imageURLs} />
					</DragDropContext>
					<div className="w-1/2">
						<ButtonMain type="button" id="file" onClick={handleClickOnFileButton} title='Додати фотографію' />
					</div>
					<input type="file" ref={hiddenFileInput} style={{ display: 'none' }} onChange={handleFileChange} />
				</div>
				<div className='flex items-center justify-end gap-5 mt-5'>
					<ButtonMain title="Назад" onClick={handleIsEditing} />
					<ButtonMain title="Зберегти" onClick={handleSaveClick} />
				</div>

			</div>
		</>
	)
}

export default EditAnnouncement