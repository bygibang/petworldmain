import logo from '../../../public/Logo/logo.svg';
import textLogo from '../../../public/Logo/logoText.svg'
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from "react-redux";
import { popupAlert } from "../../../services/popupAlert.service";
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import LogoutIcon from '@mui/icons-material/Logout';
import { signOut } from 'firebase/auth';
import { auth } from '../../../services/firebase.service';
import MotionFrame from '../../ui/motionFrame/MotionFrame';


const MobileHeader = () => {
	const [isOpen, setIsOpen] = useState(false);
	const isLogin = useSelector(store => store.user.user.isUser)
	const router = useNavigate()
	const dispatch = useDispatch()

	const navigateAndShowPopup = (path, title, text, icon) => {
		router(path);
		popupAlert(title, text, icon);
	};

	const handleLogout = () => {
		signOut(auth).then(() => {
			localStorage.removeItem('user');
			localStorage.removeItem('isAdmin');
			dispatch({ type: "user/logout", payload: null })
			dispatch({ type: "user/checkAdmin", payload: false });
			popupAlert('Успішно', 'Ви успішно вийшли з облікового запису!', "success")
			router('/')
		}).catch((error) => {
			popupAlert("Oops...", "Something went wrong!", "error")
		});
	}

	return (
		<header className='w-full hidden border-b-2 border-border max-xl:block min-xl:hidden'>
			<div className="w-full py-4 flex justify-between max-2xl:px-5 max-w-screen-2xl m-auto">
				<NavLink to={"/"} className="flex items-center gap-2.5">
					<img src={logo} alt="" className="w-8 py-0.5 px-0.5 bg-primary-100 rounded-md" />
					<img src={textLogo} alt="" className="w-24" />
				</NavLink>

				<div>
					<button onClick={() => setIsOpen(!isOpen)} className='text-primary-100'>{isOpen ? <CloseIcon className='text-4xl' /> : <MenuIcon className='text-4xl' />}</button>
				</div>
				{isOpen &&
					<div className='absolute right-8 top-14 z-20 flex flex-col items-start gap-5 bg-white p-4 rounded-xl border border-primary-100'>
						<MotionFrame key={isOpen} lineY={0}>
							<div className='flex flex-col gap-2'>
								<NavLink to={"/Catalog"} className="text-text_grey-100 text-lg font-medium hover:scale-105 hover:text-primary-100 transition-transform duration-200 ">Оголошення</NavLink>
								<button onClick={() =>
									isLogin ?
										router("/creatingAnAnnouncement")
										:
										navigateAndShowPopup(
											"/authorization",
											"Для того щоб створити оголошення ввійдіть або зареєструйтеся ",
											"",
											"info"
										)} className="text-text_grey-100 text-lg font-medium hover:scale-105 hover:text-primary-100 transition-transform duration-200 ">
									Додати оголошення
								</button>
							</div>
							{isLogin ? (
								<div className='flex flex-col items-start gap-3'>
									<NavLink to='/profile' className="flex items-center gap-2 text-text_grey-100 font-medium text-lg hover:text-primary-100 transition-colors duration-300">
										<PermIdentityIcon fontSize="large" className="text-primary-100 bg-hover-bg rounded-full" />
										{isLogin.email}
									</NavLink>
									<button onClick={handleLogout} className='flex items-center gap-2 text-text_grey-100 font-medium text-lg'><LogoutIcon className="text-primary-100" />Вийти</button>
								</div>
							) : (<NavLink to='/authorization' className="text-text_grey-100 font-medium text-lg hover:text-primary-100 transition-colors duration-300">Аккаунт</NavLink>)
							}
						</MotionFrame>
					</div>
				}
			</div>
		</header >
	)
}

export default MobileHeader



