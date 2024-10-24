import Registration from "../components/screens/Registration/Registration"
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, db } from "../services/firebase.service";
import { popupAlert } from "../services/popupAlert.service";

const RegistrationPage = () => {
	const router = useNavigate();
	const dispatch = useDispatch();

	const handleRegister = async (values, e) => {
		e.preventDefault();
		try {
			const register = await createUserWithEmailAndPassword(
				auth,
				values.email,
				values.password
			);
			await sendEmailVerification(register.user);
			await setDoc(doc(db, "users", register.user.uid), {
				...values,
				isAdmin: false,
				timeStamp: serverTimestamp(),
			});
			dispatch({ type: "user/login", payload: register.user })
			localStorage.setItem('user', JSON.stringify(register.user));
			popupAlert('Профіль створено!', `Лист з підтвердженням електронної пошти надіслано на ${register.user.email}. Будь ласка, підтвердіть Вашу пошту`, "success")
			router('/profile');
		} catch (error) {
			console.error('Error registering user:', error);
		}
	};

	return (
		<Registration
			handleRegister={handleRegister}
		/>
	)
}

export default RegistrationPage