import { useEffect, useState } from "react";
import Home from "../components/screens/Home"
import useAnnouncements from "../hooks/useAnnouncements";
import { collection, getDocs, query, where } from "@firebase/firestore";
import { petType } from "../services/options.service";
import { db } from "../services/firebase.service";

const HomePage = () => {
	const { announcements, isLoading, hasMore, handleLoadMore } = useAnnouncements(4);
	const [animalCounts, setAnimalCounts] = useState({});

	useEffect(() => {
	  const fetchAnimalCounts = async () => {
		 const counts = {};
		 for (const type of petType) {
			const q = query(collection(db, 'announcements'), where('petType', '==', type));
			const querySnapshot = await getDocs(q);
			counts[type] = querySnapshot.docs.length;
		 }
		 setAnimalCounts(counts);
	  };
 
	  fetchAnimalCounts();
	}, []);

	return (
		<Home
			announcements={announcements}
			isLoading={isLoading}
			hasMore={hasMore}
			handleLoadMore={handleLoadMore}
			animalCounts={animalCounts}
		/>
	);
};

export default HomePage;