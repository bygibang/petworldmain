import Profile from '../components/screens/Profile/Profile'
import { useEffect, useState } from 'react';
import useUserData from '../hooks/useUserDataAnnouncements';
import useActiveAnnouncements from '../hooks/useActiveAnnouncements';
import useDisabledAnnouncements from '../hooks/useDisabledAnnouncements';
import { collection, doc, getDocs, updateDoc } from 'firebase/firestore';
import { auth, db } from '../services/firebase.service';
import { sendSignInLinkToEmail, updateEmail } from 'firebase/auth';
import { useSelector } from 'react-redux';
import Swal from "sweetalert2";
import { popupAlert, PopupAlertShowError } from '../services/popupAlert.service';


const ProfilePage = () => {
	const { userData } = useUserData();
	const [isActive, setIsActive] = useState(true);
	const { announcements: activeAnnouncements, isLoading: activeLoading, hasMore: activeHasMore, handleLoadMore: handleLoadMoreActive } = useActiveAnnouncements(4);
	const { announcements: disabledAnnouncements, isLoading: disabledLoading, hasMore: disabledHasMore, handleLoadMore: handleLoadMoreDisabled } = useDisabledAnnouncements(4);
	const [activeCount, setActiveCount] = useState(0);
	const [disabledCount, setDisabledCount] = useState(0);
	const [isEditing, setIsEditing] = useState(false); // State for editing mode
	const isUser = useSelector(store => store.user.user.isUser)


	useEffect(() => {
		const getAnnouncementCounts = async () => {
			try {
				const announcementsRef = collection(db, 'announcements');
				const snapshot = await getDocs(announcementsRef);
				let activeCount = 0;
				let disabledCount = 0;
				snapshot.forEach(doc => {
					const announcement = doc.data();
					if (announcement.userID === isUser.uid) { // Check if the announcement belongs to the logged-in user
						if (announcement.isActive) {
							activeCount++;
						} else {
							disabledCount++;
						}
					}
				});
				setActiveCount(activeCount);
				setDisabledCount(disabledCount);
			} catch (error) {
				console.error("Ошибка при получении количества объявлений:", error);
			}
		};
		getAnnouncementCounts();
	}, []);

	const handleEditClick = () => {
		setIsEditing(!isEditing);
	};

	const handleCancelClick = (values) => {
		// Check if any data has been changed
		if (
			values.name !== '' || // Compare with initial empty string
			values.surname !== '' ||
			values.email !== '' ||
			values.location !== '' ||
			values.phone_number !== ''
		) {
			PopupAlertShowWithButtons()
		} else {
			setIsEditing(false);
			
		}
	};


	const PopupAlertShowWithButtons = () => {
		Swal.fire({
			position: "top-end",
			text: 'У Вас не збережені дані. Ви дійсно бажаєте вийти?',
			showCloseButton: true,
			showDenyButton: true,
			confirmButtonText: "Так",
			denyButtonText: "Hi",
			confirmButtonColor: "#5A00D6",
			denyButtonColor: "#f52e20",
		}).then((result) => {
			if (result.isConfirmed) {
				setIsEditing(false)
			}
		});
	}


	const handleSaveClick = async (values) => {
		if (
			values.name === '' ||
			values.surname === '' ||
			values.email === '' ||
			values.location === '' ||
			values.phone_number === ''
		) {
			// Show an error message if any field is empty
			popupAlert("Будь ласка, заповніть всі поля.", '', 'error')
			return; // Prevent saving
		}
		try {
			const userRef = doc(db, 'users', isUser.uid);
			// Update the document with editedData
			await updateDoc(userRef, {
				...values, // Spread the existing values
				isAdmin: userData?.isAdmin || false,
				location: userData?.location || '',
				timeStamp: userData?.timeStamp || null,
			});
			// Update Authentication email if changed
			if (values.email !== userData.email) {
				await updateEmail(auth.currentUser, values.email);
				await sendSignInLinkToEmail(auth, values.email, {
					handleCodeInApp: true,
					url: window.location.origin // Or your desired redirect URL
				});
			}
			popupAlert("Профіль оновлено!", 'Будь ласка, підтвердіть Вашу пошту, щоб мати можливість заходити під новим емейлом', "success")
			setIsEditing(false);
		} catch (error) {
			PopupAlertShowError()
			setIsEditing(false);
			console.error("Error saving data:", error);
		}
	};

	return (
		<Profile
			userData={userData}
			isUser={isUser}
			isEditing={isEditing}
			isActive={isActive}
			setIsActive={setIsActive}
			activeCount={activeCount}
			disabledCount={disabledCount}
			activeAnnouncements={activeAnnouncements}
			activeLoading={activeLoading}
			activeHasMore={activeHasMore}
			handleLoadMoreActive={handleLoadMoreActive}
			handleEditClick={handleEditClick}
			handleSaveClick={handleSaveClick}
			handleCancelClick={handleCancelClick}
			disabledAnnouncements={disabledAnnouncements}
			disabledLoading={disabledLoading}
			disabledHasMore={disabledHasMore}
			handleLoadMoreDisabled={handleLoadMoreDisabled}
		/>
	);
};

export default ProfilePage;