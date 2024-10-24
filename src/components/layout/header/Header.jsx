import { NavLink, useNavigate } from "react-router-dom"
import Logo from "../../ui/logo/Logo"
import ButtonMain from "../../ui/buttonMain/buttonMain"
import AddIcon from '@mui/icons-material/Add';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import logo from '../../../public/Logo/logo.svg';
import textLogo from '../../../public/Logo/logoText.svg'
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import { auth} from "../../../services/firebase.service";
import { popupAlert } from "../../../services/popupAlert.service";



const Header = () => {
	const isLogin = useSelector(store => store.user.user.isUser)
	const router = useNavigate()
	const dispatch = useDispatch()


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

	const navigateAndShowPopup = (path, title, text, icon) => {
		router(path);
		popupAlert(title, text, icon);
	};

	return (
		<header className="w-full py-6 border-b-2 border-border z-10 max-xl:hidden">
			<div className="w-full flex justify-between max-2xl:px-5 max-w-screen-2xl m-auto">
				<div className="flex items-center gap-10">
					<Logo colorLogo="py-2.5 px-2 bg-primary-100 rounded-md" logo={logo} textLogo={textLogo} />
					<NavLink to={"/Catalog"} className="text-text_grey-100 text-lg font-medium hover:scale-105 hover:text-primary-100 transition-transform duration-200 ">Оголошення</NavLink>
				</div>
				<div className="flex items-center gap-20">
					<ButtonMain
						title="Додати оголошення"
						icon={<AddIcon />}
						onClick={() =>
							isLogin ?
								router("/creatingAnAnnouncement")
								:
								navigateAndShowPopup(
									"/authorization",
									"Для того щоб створити оголошення ввійдіть або зареєструйтеся ",
									"",
									"info"
								)}
					/>
					<div className="flex items-center gap-3">
						<PermIdentityIcon fontSize="large" className="text-primary-100 bg-hover-bg rounded-full" />
						{isLogin ? (
							<>
								<NavLink to='/profile' className="mr-5 text-text_grey-100 font-medium text-lg hover:text-primary-100 transition-colors duration-300">
									{isLogin.email}
								</NavLink>
								<ButtonMain onClick={handleLogout} title="Выйти" />
							</>
						) : (<NavLink to='/authorization' className="text-text_grey-100 font-medium text-lg hover:text-primary-100 transition-colors duration-300">Аккаунт</NavLink>)
						}
					</div>
				</div>
			</div>
		</header>
	)
}

export default Header