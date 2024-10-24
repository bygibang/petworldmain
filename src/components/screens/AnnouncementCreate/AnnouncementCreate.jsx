import { useEffect, useRef, useState } from "react"
import CreateStepOne from "./createStepOne/CreateStepOne"
import CreateStepTwo from "./createStepTwo/CreateStepTwo"
import { doc, serverTimestamp, setDoc } from "firebase/firestore"
import CreateStepThird from "./createStepThird/CreateStepThird"
import Stepper from "../../ui/stepper/Stepper"
import ButtonMain from "../../ui/buttonMain/ButtonMain"
import { popupAlert } from "../../../services/popupAlert.service"
import { db } from "../../../services/firebase.service"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { v4 as uuidv4 } from 'uuid'
import Swal from "sweetalert2"
import { useNavigate } from "react-router-dom"
import MotionFrame from "../../ui/motionFrame/MotionFrame"


const AnnouncementCreate = () => {
	const [step, setStep] = useState(1)
	const [announcement, setAnnouncement] = useState({});
	const auth = getAuth();
	const router = useNavigate()
	const nextButtonRef = useRef(null);

	const isStepValid = (stepNumber) => {
		switch (stepNumber) {
			case 1:
				return formData.title && formData.petType && formData.price && formData.location && formData.userType;
			case 2:
				return formData.breed && formData.age.value && formData.age.type && formData.gender && formData.health.length > 0 && formData.documents.length > 0;
			case 3:
				return formData.description && formData.images.length > 0; // Check if at least one image is uploaded
			default:
				return false;
		}
	};

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				// User is signed in
				setFormData({
					...formData,
					userID: user.uid, // Set userID from Firebase Authentication
				});
			} else {
				// User is signed out
				// Handle user sign-out logic
			}
		});
	}, []);

	const [formData, setFormData] = useState({
		userID: '',
		title: '',
		description: '',
		petType: '',
		breed: '',
		gender: '',
		age: {
			value: 0,
			type: 'Місяців'
		},
		price: 0 || "",
		documents: [],
		health: [],
		location: '',
		userType: '',
		images: [],
		isActive: true
	})

	const handleFormData = (data) => {
		setFormData(data);
	};

	const handlePopupAlertShow = () => {
		Swal.fire({
			title: 'Оголошення створено',
			text: 'Вим можете преглянути його в особистому кабінеті',
			icon: 'success',
			showCloseButton: true,
			confirmButtonText: "Переглянути оголошення",
			confirmButtonColor: "#5A00D6",
		}).then((result) => {
			if (result.isConfirmed) {
				return router("/profile")
			}
		});;
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		setAnnouncement(formData);
		try {
			const announcementId = uuidv4();
			await setDoc(doc(db, "announcements", announcementId), {
				...formData,
				createdOn: serverTimestamp(),
				userID: auth.currentUser.uid,
			});
			router('/')
			handlePopupAlertShow()
		} catch (error) {
			console.log(error)
			popupAlert("Упсс...", "щось пішло не так!", "error")
		}
	};

	useEffect(() => {
		const isCurrentStepValid = isStepValid(step);
		if (nextButtonRef.current) {
			nextButtonRef.current.disabled = !isCurrentStepValid;
		}
	}, [step, formData]);
	
	return (
		<div className="w-full flex items-center justify-center max-w-screen-2xl m-auto max-md:px-5">
			<div className="w-1/3 my-24 max-1xl:w-1/2 max-lg:w-2/3 max-md:w-full">
				<MotionFrame key={step} lineY={15}>
					<div className="w-full flex flex-col items-center justify-center border border-border rounded-3xl shadow-xl py-10 px-12 gap-5">
						<div className="flex flex-col items-center justify-center">
							<p className="font-normal text-lg">
								{step === 1 && "КРОК 1"}
								{step === 2 && "КРОК 2"}
								{step === 3 && "КРОК 3"}
							</p>
							<h1 className="font-semibold text-3xl text-center text-text_grey-100 max-md:text-xl">
								{step === 1 && "Загальна iнформацiя"}
								{step === 2 && "Інформація про тварину"}
								{step === 3 && "Вигляд тварини"}
							</h1>
						</div>
						<Stepper activeStep={step} />
						<div className="w-full">
							{step === 1 && <CreateStepOne formData={formData} handleFormData={handleFormData} />}
							{step === 2 && <CreateStepTwo formData={formData} handleFormData={handleFormData} />}
							{step === 3 && <CreateStepThird formData={formData} handleFormData={handleFormData} />}
						</div>
						<div className="w-full flex items-center mt-10 gap-10">
							{step !== 1 && <ButtonMain title="Назад" onClick={() => setStep(step - 1)} variant="secondary"/>}
							{step === 3 ?
								<ButtonMain title="Опублікувати" onClick={handleSubmit} ref={nextButtonRef} />
								:
								<ButtonMain title="Вперед" ref={nextButtonRef} onClick={() => setStep(step + 1)} />
							}
						</div>
					</div>
				</MotionFrame>
			</div>
		</div>
	)
}

export default AnnouncementCreate