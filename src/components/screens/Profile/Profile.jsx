import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import PhoneIcon from '@mui/icons-material/Phone';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import CatalogCard from '../../ui/catalogCard/CatalogCard';
import ButtonMain from '../../ui/buttonMain/ButtonMain';
import EditProfile from './EditProfile';
import MotionFrame from '../../ui/motionFrame/MotionFrame';
import Loader from '../../ui/loader/Loader';
import { auth } from '../../../services/firebase.service';
import { popupAlert } from '../../../services/popupAlert.service';
import { sendSignInLinkToEmail } from 'firebase/auth';


const Profile = ({
	userData,
	isUser,
	isEditing,
	isActive,
	setIsActive,
	activeCount,
	disabledCount,
	activeAnnouncements,
	activeLoading,
	activeHasMore,
	handleLoadMoreActive,
	handleEditClick,
	handleSaveClick,
	handleCancelClick,
	disabledAnnouncements,
	disabledLoading,
	disabledHasMore,
	handleLoadMoreDisabled,
}) => {

	const handleResendConfirmation = async () => {
		try {
			await sendSignInLinkToEmail(auth, userData.email, {
				handleCodeInApp: true,
				url: window.location.origin // Or your desired redirect URL
			});
			popupAlert('Успішно', 'На вашу пошту надіслано посилання для підтвердження.', 'success');
		} catch (error) {
			popupAlert('Упсс...', 'Сталася помилка. Спробуйте пізніше.', 'error');
		}
	};

	if (!userData) {
		return <Loader />
	}

	return (
		<div className='flex flex-col max-2xl:px-5 mt-10 mb-20 max-w-screen-2xl m-auto'>
			<div>
				{!isEditing &&
					<div className='w-full flex items-center justify-between border-b border-border pb-3'>
						<h1 className='font-semibold text-3xl'>{userData.name} {userData.surname}</h1>
						<MotionFrame key={isEditing} lineY={0}>
							<button className='underline text-primary-100' onClick={handleEditClick}>Редагувати профиль</button>
						</MotionFrame>
					</div>}

				{isEditing ? (
					<MotionFrame key={isEditing}>
						<EditProfile
							userData={userData}
							handleCancelClick={handleCancelClick}
							handleSaveClick={handleSaveClick}
						/>
					</MotionFrame>
				) : (
					<MotionFrame key={isEditing} lineY={15}>
						<div className='w-1/3 max-xl:w-1/2 max-lg:w-full flex flex-col items-start justify-start gap-5 pt-16 pb-32'>
							<div className='w-full flex items-center justify-between border-b border-text_grey-200/15 pb-3'>
								<div className='flex items-center gap-1'>
									<FmdGoodOutlinedIcon className='text-3xl text-primary-100' />
									<h3 className='font-medium text-text_grey-200 text-lg'>Локація</h3>
								</div>
								<p className='font-medium text-lg'>{userData.location}</p>
							</div>
							<div className='w-full flex items-center justify-between border-b border-text_grey-200/15 pb-3'>
								<div className='flex items-center gap-1'>
									<PhoneIcon className='text-3xl text-primary-100' />
									<h3 className='font-medium text-text_grey-200 text-lg'>Номер телефону</h3>
								</div>
								<p className='font-medium text-lg'>{userData?.phone_number}</p>
							</div>
							<div className='w-full flex items-center justify-between border-b border-text_grey-200/15 pb-3'>
								<div className='flex items-center gap-1'>
									<MailOutlineIcon className='text-3xl text-primary-100' />
									<h3 className='font-medium text-text_grey-200 text-lg'>Імейл</h3>
								</div>
								<p className='font-medium text-lg'>{userData.email}</p>
							</div>
							{!auth.currentUser.emailVerified &&
								<div className='w-full text-right'>
									<span className="text-error"> Електронну адресу не підтверджено. </span>
									<button className="underline text-primary-100" onClick={handleResendConfirmation}>
										Підтвердити зараз
									</button>
								</div>}
						</div>
					</MotionFrame>
				)}
			</div>

			<div>
				<h2 className='font-semibold text-3xl'>Оголошення</h2>
				<div className='flex gap-10 border-b border-border pt-10 pb-3 mb-20'>
					<button
						className='font-medium text-text_grey-200 text-lg ml-6 hover:text-primary-100 transition-all duration-300'
						onClick={() => setIsActive(true)}>
						Активнi({activeCount})
					</button>
					<button
						className='font-medium text-text_grey-200 text-lg hover:text-primary-100 hover:scale-105 transition-all duration-300'
						onClick={() => setIsActive(false)}>
						Неактивнi({disabledCount})
					</button>
				</div>
			</div>
			{isActive ? (
				<MotionFrame key={activeAnnouncements} lineY={15} >
					<div className='w-full flex flex-col items-center'>
						<div className='w-full h-full max-xl:grid-cols-2 max-md:grid-cols-1 max-xl:gap-16 grid grid-cols-4 gap-5'>
							{activeAnnouncements.map((announcement) => (
								<CatalogCard key={announcement.id} announcement={announcement} isUser={isUser.uid} />
							))}
						</div>
						<div className='w-full max-w-60 my-10'>
							<ButtonMain
								onClick={handleLoadMoreActive}
								disabled={!activeHasMore}
								title="Показати ще"
							/>
						</div>
					</div>
				</MotionFrame>
			) : (
				<MotionFrame key={disabledAnnouncements} lineY={50}>
					<div className='w-full flex flex-col items-center'>
						<div className='w-full h-full max-xl:grid-cols-2 max-md:grid-cols-1 max-xl:gap-16 grid grid-cols-4 gap-5'>
							{disabledAnnouncements.map((announcement) => (
								<CatalogCard key={announcement.id} announcement={announcement} isUser={isUser.uid} />
							))}
						</div>
						<div className='w-full max-w-60 my-10'>
							<ButtonMain
								onClick={handleLoadMoreDisabled}
								disabled={!disabledHasMore}
								title="Показати ще"
							/>
						</div>
					</div>
				</MotionFrame>)}
		</div>
	)
}

export default Profile