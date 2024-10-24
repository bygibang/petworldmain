import { confirmPasswordReset } from "firebase/auth";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { popupAlert } from "../../../services/popupAlert.service";
import TextFieldBasic from "../../ui/fields/textFieldBasic/TextFieldBasic";
import ButtonMain from "../../ui/buttonMain/ButtonMain";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { auth } from "../../../services/firebase.service";





const ResetPassword = () => {
	const location = useLocation();
	const [newPassword, setNewPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [error, setError] = useState(null);
 
	const handlePasswordChange = (e) => {
	  setNewPassword(e.target.value);
	};
 
	const handleConfirmPasswordChange = (e) => {
	  setConfirmPassword(e.target.value);
	};
 
	const handleSubmit = async (e) => {
	  e.preventDefault();
	  if (newPassword !== confirmPassword) {
		 setError('Паролі не співпадають');
		 return;
	  }
 
	  try {
		 await confirmPasswordReset(auth, location.state.oobCode, newPassword);
		 popupAlert('Успішно', 'Пароль успішно скинуто!', 'success');
	  } catch (error) {
		 setError(error.message);
	  }
	};
 
	return (
	  <div className='mt-24 mb-48 flex items-center justify-center max-w-screen-2xl m-auto max-md:px-5'>
		 <div className='w-1/3 max-1xl:w-1/2 max-lg:w-2/3 max-md:w-full py-12 px-10 flex flex-col items-center border border-border rounded-3xl shadow-xl'>
			<div className='w-full flex flex-col items-center gap-2 mb-10'>
			  <h1 className='font-medium text-3xl'>Скинути пароль</h1>
			  <p className='font-normal text-xl text-center'>Введіть новий пароль</p>
			</div>
			<form onSubmit={handleSubmit} className='w-full flex flex-col gap-10 text-center'>
			  <TextFieldBasic
				 label="Новий пароль"
				 type="password"
				 value={newPassword}
				 onChange={handlePasswordChange}
			  />
			  <TextFieldBasic
				 label="Підтвердження паролю"
				 type="password"
				 value={confirmPassword}
				 onChange={handleConfirmPasswordChange}
			  />
			  {error && <p className='font-light text-xs text-error text-left flex items-center gap-2'>{<ErrorOutlineIcon />}{error}</p>}
			  <ButtonMain
				 title="Скинути пароль"
				 type="submit"
			  />
			</form>
		 </div>
	  </div>
	);
 };
 
 export default ResetPassword;