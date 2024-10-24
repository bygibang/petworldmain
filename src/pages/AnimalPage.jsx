import { useNavigate, useParams } from "react-router-dom";
import Announcement from "../components/screens/Announcement/Announcement"
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../services/firebase.service";

const AnimalPage = () => {
	const [announcement, setAnnouncement] = useState(null);
	const [user, setUser] = useState(null);
	const { id } = useParams(); // Get the ID from the URL params
	const router = useNavigate()

	useEffect(() => {
		const fetchAnnouncement = async () => {
			try {
				const docRef = doc(db, "announcements", id); // Reference to the announcement document
				const docSnap = await getDoc(docRef);

				if (docSnap.exists()) {
					setAnnouncement(docSnap.data());

					// Fetch user data based on the userID from the announcement
					const userDocRef = doc(db, "users", docSnap.data().userID);
					const userDocSnap = await getDoc(userDocRef);

					if (userDocSnap.exists()) {
						setUser(userDocSnap.data());
					} else {
						console.log("User not found");
					}
				} else {
					router("/AnnouncementNotFound")
				}
			} catch (error) {
				console.error("Error fetching announcement:", error);
			}
		};

		fetchAnnouncement();
	}, [id]);

	if (!announcement) {
		return router("/AnnouncementNotFound")
	}

	return (
		<Announcement
			announcement={announcement}
			user={user}
			setAnnouncement={setAnnouncement}
		/>
	)
}

export default AnimalPage