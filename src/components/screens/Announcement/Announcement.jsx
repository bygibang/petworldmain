import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { useEffect, useState } from 'react';
import AnnouncementOption from './AnnouncementOption/AnnouncementOption'
import EditAnnouncement from './EditAnnouncement';
import ButtonMain from '../../ui/buttonMain/ButtonMain'
import { useSelector } from 'react-redux';
import { deleteObject, getStorage, ref } from "firebase/storage"
import DeleteIcon from '@mui/icons-material/Delete';
import MotionFrame from '../../ui/motionFrame/MotionFrame'

import person from '../../../public/AnnouncementIcons/person.svg'
import article from '../../../public/AnnouncementIcons/article.svg'
import calendar_month from '../../../public/AnnouncementIcons/calendar_month.svg'
import call from '../../../public/AnnouncementIcons/call.svg'
import fmd_good from '../../../public/AnnouncementIcons/fmd_good.svg'
import health_and_safety from '../../../public/AnnouncementIcons/health_and_safety.svg'
import home from '../../../public/AnnouncementIcons/home.svg'
import loyalty from '../../../public/AnnouncementIcons/loyalty.svg'
import gender from '../../../public/AnnouncementIcons/mdi_gender-male-female.svg'
import pets from '../../../public/AnnouncementIcons/pets.svg'

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import './swiper.css';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../services/firebase.service';
import { useNavigate, useParams } from 'react-router-dom';
import { popupAlert } from '../../../services/popupAlert.service';




const Announcement = ({ announcement, user, setAnnouncement }) => {
	const [thumbsSwiper, setThumbsSwiper] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const isUser = useSelector(store => store.user.user.isUser)
	const [isEditing, setIsEditing] = useState(false); // State for editing mode
	const { id } = useParams();
	const router = useNavigate()
	const [editedData, setEditedData] = useState({
		age: announcement.age || [],
		breed: announcement.breed || '',
		description: announcement.description || '',
		documents: announcement.documents || [],
		health: announcement.health || [],
		images: announcement.images || [],
		isActive: announcement.isActive || true,
		location: announcement.location || '',
		petType: announcement.petType || '',
		price: announcement.price || '',
		title: announcement.title || '',
		userType: announcement.userType || '',
	});


	const handleEditedData = (value) => {
		setEditedData(value)
	}

	useEffect(() => {
		if (user) {
			setIsLoading(false);
		}
	}, [user]);

	const handleIsEditing = () => {
		setIsEditing(!isEditing)
	}
	const handleDeactivate = async () => {
		try {
			const announcementRef = doc(db, 'announcements', id);
			await updateDoc(announcementRef, {
				isActive: !announcement.isActive, // Toggle isActive
			});
			router('/profile')
			popupAlert("Успішно", "Стан оголошення змінено!", "success")
		} catch (error) {
			console.error("Error deactivating announcement:", error);
		}
	};

	const handleDeleteImage = async (index) => {
		try {
			// 1. Extract the filename from the image URL
			const filename = announcement.images[index].split('/o/images%2F')[1].split('?')[0];
			// 2. Delete the image from Storage
			const storage = getStorage();
			const imageRef = ref(storage, `images/${filename}`);
			await deleteObject(imageRef);
			// 3. Update the images array in the announcements collection
			const announcementRef = doc(db, 'announcements', id);
			const updatedImages = [...announcement.images];
			updatedImages.splice(index, 1); // Remove the image from the array
			await updateDoc(announcementRef, { images: updatedImages });
			// 4. Update the announcement.images array (for the component)
			setEditedData({ ...editedData, images: updatedImages });
			// 5. Update the announcement prop (to trigger re-render)
			setAnnouncement({ ...announcement, images: updatedImages });
		} catch (error) {
			console.error("Error deleting image:", error);
		}
	};


	if (isLoading) {
		return <div>Loading user data...</div>;
	}

	return (
		<div className="w-full mt-10 mb-20">
			<div className='w-full flex items-start justify-between gap-12 max-2xl:px-5 max-w-screen-2xl m-auto max-lg:flex-col'>
				<div className='w-1/2 max-lg:w-full'>
					<div className='max-w-screen-extramd max-lg:max-w-screen-xl flex flex-col items-start justify-center gap-5' >
						<Swiper
							style={{
								'--swiper-navigation-color': '#5A00D6',
								'--swiper-pagination-color': '#5A00D6',
							}}
							spaceBetween={10}
							navigation={true}
							thumbs={{ swiper: thumbsSwiper }}
							modules={[FreeMode, Navigation, Thumbs]}
							className="mySwiper2"
						>
							{announcement.images.map((imageUrl, index) => (
								<SwiperSlide key={index}>
									{isEditing && (
										<div className="absolute top-0 right-0 m-2">
											<button onClick={() => handleDeleteImage(index)}>
												<DeleteIcon className='w-10 h-10 p-1 text-primary-100 bg-white/40 backdrop-blur-sm rounded-full hover:scale-110 transition-transform duration-300' />
											</button>
										</div>
									)}
									<img src={imageUrl} />
								</SwiperSlide>
							))}
						</Swiper>
						<Swiper
							onSwiper={setThumbsSwiper}
							spaceBetween={10}
							slidesPerView={4}
							freeMode={true}
							watchSlidesProgress={true}
							modules={[FreeMode, Navigation, Thumbs]}
							className="mySwiper"
						>
							{announcement.images.map((imageUrl, index) => (
								<SwiperSlide key={index} className='swiper-slide2'>
									{isEditing && (
										<div className="absolute top-2 right-2 ">
											<button onClick={() => handleDeleteImage(index)}>
												<DeleteIcon className='w-10 h-10 p-1 text-primary-100 bg-white/40 backdrop-blur-sm rounded-full hover:scale-110 transition-transform duration-300' />
											</button>
										</div>
									)}
									<img src={imageUrl} />
								</SwiperSlide>
							))}
						</Swiper>
					</div>
					<div className="flex flex-col items-start gap-4">
						<h2 className="font-medium text-lg">Додаткова інформація</h2>
						<p className="font-normal text-sm">{announcement.description}</p>
					</div>
				</div>
				{isEditing ? (
					<MotionFrame key={isEditing} lineY={15}>
						<EditAnnouncement announcement={announcement} handleIsEditing={handleIsEditing} handleEditedData={handleEditedData} editedData={editedData} />
					</MotionFrame>
				) : (
					<section className="w-full flex flex-col gap-12">
						<MotionFrame key={announcement.price} lineY={15}>
							<div>
								<h1 className="font-medium text-3xl">{announcement.title}</h1>
								{announcement.price === "0" ? <h4>Безкоштовно</h4> : <h4 className="font-medium text-2xl">₴ {announcement.price}</h4>}
							</div>
							<div>
								<h2 className="font-medium text-xl">Контакти</h2>
								<AnnouncementOption icon={person} title="Контактна особа" option={user.name} />
								<AnnouncementOption icon={call} title="Номер телефону" option={user.phone_number} />
							</div>
							<div>
								<h2 className="font-medium text-xl">Характеристики</h2>
								<AnnouncementOption icon={pets} title="Вид" option={announcement.petType} />
								<AnnouncementOption icon={loyalty} title="Різновид" option={announcement.breed} />
								<AnnouncementOption icon={gender} title="Стать" option={announcement.gender} />
								<AnnouncementOption icon={calendar_month} title="Вік" option={announcement.age} />
								<AnnouncementOption icon={fmd_good} title="Локація" option={announcement.location} />
								<AnnouncementOption icon={home} title="Походження" option={announcement.userType} />
								<AnnouncementOption icon={health_and_safety} title="Здоровʼя" option={announcement.health} />
								<AnnouncementOption icon={article} title="Документи" option={announcement.documents} />
							</div>
							{isUser?.uid === announcement.userID &&
								<div className='flex items-center justify-end gap-5'>
									<ButtonMain title={announcement.isActive ? "Деактивувати" : "Активувати"} onClick={handleDeactivate} />
									<ButtonMain title="Редагувати" onClick={handleIsEditing} />
								</div>}
						</MotionFrame>
					</section>
				)}
			</div>
		</div>
	)
}

export default Announcement