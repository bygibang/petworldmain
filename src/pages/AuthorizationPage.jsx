import Authorization from "../components/screens/Authorization/Authorization"
import { doc, getDoc } from 'firebase/firestore';
import { sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../services/firebase.service'
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { popupAlert } from '../services/popupAlert.service'
import { useState } from "react";
import ForgotPassword from "../components/screens/Authorization/ForgotPassword";


const AuthorizationPage = () => {
	const [openForgotPass, setOpenForgotPass] = useState(false)
	const router = useNavigate();
	const dispatch = useDispatch();

	async function checkAdmin(userId) {
		try {
			const userDocRef = doc(db, 'users', userId);
			const docSnap = await getDoc(userDocRef);

			if (docSnap.exists()) {
				const userData = docSnap.data();
				return userData.isAdmin;
			} else {
				return false;
			}
		} catch (error) {
			return false;
		}
	}

	const handleSubmitAuth = (data, e) => {
		e.preventDefault();
		if (auth.currentUser) {
			router('/profile');
			return;
		}
		signInWithEmailAndPassword(auth, data.email, data.password)
			.then((userCredential) => {
				const user = userCredential.user;
				dispatch({ type: "user/login", payload: user });
				localStorage.setItem('user', JSON.stringify(user));
				popupAlert('Успішно', 'Ви успішно зайшли до облікового запису!', "success")
				router('/profile');
				return checkAdmin(user.uid);
			})
			.then((isAdmin) => {
				dispatch({ type: 'user/checkAdmin', payload: isAdmin })
				localStorage.setItem('isAdmin', isAdmin);
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				popupAlert("Упсс...", "Неправильні дані!", "error");
			});
	};


	const handleForgotPassword = (email, e) => {
		e.preventDefault();
		sendPasswordResetEmail(auth, email)
			.then(() => {
				router("/authorization")
				popupAlert('Успішно', 'На вашу пошту надіслано інструкції для відновлення пароля!', 'success');
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				popupAlert('Упсс...', 'Сталася помилка. Перевірте правильність введеної електронної пошти.', 'error');
			});
	};


	return (
		<>
			{openForgotPass ? (
				<ForgotPassword
					handleForgotPassword={handleForgotPassword}
				/>
			) : (
				<Authorization
					handleSubmitAuth={handleSubmitAuth}
					setOpenForgotPass={setOpenForgotPass}
				/>)}
		</>

	)
}

export default AuthorizationPage