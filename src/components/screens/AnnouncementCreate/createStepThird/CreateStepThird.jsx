import { useRef, useState } from "react";
import TextFiled from "../../../ui/fields/textFieldBasic/TextFieldBasic"
import ButtonMain from "../../../ui/buttonMain/ButtonMain";
import { DragDropContext } from 'react-beautiful-dnd';
import SortableBox from "./sortableImages/SortableBox";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid'

const CreateStepThird = ({ formData, handleFormData }) => {
	const [files, setFiles] = useState([]);
	const [imageURLs, setImageURLs] = useState([]);
	const [file, setFile] = useState(null);
	const hiddenFileInput = useRef(null);
	const storage = getStorage();

	const handleChange = (e) => {
		const { name, value } = e.target;
		handleFormData({ ...formData, [name]: value });
	};

	const handleFileChange = async (event) => {
		const file = event.target.files[0];
		setFile(file);
		const blob = new Blob([file], { type: file.type });
		const filename = `${uuidv4()}-${file.name}`;
		const imageRef = ref(storage, `images/${filename}`);
		const uploadTask = uploadBytesResumable(imageRef, blob);

		uploadTask.on(
			'state_changed',
			(snapshot) => {
				const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
			},
			(error) => { },
			() => {
				getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
					setImageURLs((prevImageURLs) => [...prevImageURLs, downloadURL]);
					setFiles((prevFiles) => [...prevFiles, file]);
					handleFormData({ ...formData, images: [...formData.images, downloadURL] });
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
		handleFormData({ ...formData, images: items });
	};
	return (
		<>
			<TextFiled label="Додаткова інформація" placeholder="Введiть текст" name="description" value={formData.description} onChange={handleChange} rows={7} multiline={true} />
			<div>
				<h2>Фото</h2>
				<p>Перше фото буде на обкладинці оголошення, перетягніть, щоб змінити порядок фото</p>
				<DragDropContext onDragEnd={handleOnDragEnd}> {/* Apply handleOnDragEnd here */}
					<SortableBox files={files} imageURLs={imageURLs} />
				</DragDropContext>
				<div className="w-1/2">
					<ButtonMain type="button" id="file" onClick={handleClickOnFileButton} title='Upload file' />
				</div>
				<input type="file" ref={hiddenFileInput} style={{ display: 'none' }} onChange={handleFileChange} /> {/* Скрытый элемент input */}
			</div>

		</>
	);
};


export default CreateStepThird