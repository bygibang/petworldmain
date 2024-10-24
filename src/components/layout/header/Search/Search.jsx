import { collection, getDocs, getFirestore } from "@firebase/firestore";
import { initializeApp } from "firebase/app";
import { useEffect, useState } from "react";
import { firebaseConfig } from "../../../../services/firebase.service";
import TextFieldBasic from "../../../ui/fields/textFieldBasic/TextFieldBasic";
import SearchList from "./SearchList";

const Search = () => {
	const [searchTerm, setSearchTerm] = useState('');
	const [announcements, setAnnouncements] = useState([]);


	const app = initializeApp(firebaseConfig); // Assuming you have firebaseConfig defined
	const db = getFirestore(app);

	useEffect(() => {
		let timeoutId;

		const fetchData = async () => {
			const announcementsRef = collection(db, "announcements");
			const snapshot = await getDocs(announcementsRef);
			const allAnnouncements = snapshot.docs.map((doc) => ({
				id: doc.id,
				...doc.data(),
			}));

			// Filter only if searchTerm is not empty
			let filteredAnnouncements = [];
			if (searchTerm) {
				filteredAnnouncements = allAnnouncements.filter((announcement) => {
					return announcement.title.toLowerCase().includes(searchTerm.toLowerCase());
				});
			}

			setAnnouncements(filteredAnnouncements);
		};

		// Clear any previous timeout
		if (timeoutId) {
			clearTimeout(timeoutId);
		}

		// Set a new timeout to fetch data after 1 second
		timeoutId = setTimeout(() => {
			fetchData();
		}, 500);

		return () => clearTimeout(timeoutId); // Cleanup on unmount
	}, [searchTerm]);


	const handleSearchChange = (event) => {
		setSearchTerm(event.target.value);
	};
	return (
		<div className="relative w-full">
			<TextFieldBasic
				type="search"
				placeholder="Поиск..."
				value={searchTerm}
				onChange={handleSearchChange}
			/>
			<SearchList announcements={announcements}/>
		</div>

	)
}

export default Search