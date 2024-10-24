import { initializeApp } from "firebase/app";
import { collection, getDocs, getFirestore, limit, query, startAfter, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { firebaseConfig } from "../services/firebase.service";

const useDisabledAnnouncements = (limitPerPage = 3) => {
	const [announcements, setAnnouncements] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [hasMore, setHasMore] = useState(true);
	const [lastDoc, setLastDoc] = useState(null);
	const [initialFetchComplete, setInitialFetchComplete] = useState(false);
	const currentUser = useSelector((store) => store.user.user.isUser);
 
	const app = initializeApp(firebaseConfig);
	const db = getFirestore(app);
 
	const fetchAnnouncements = async () => {
	  const announcementsRef = collection(db, 'announcements');
 
	  let queryRef = query(
		 announcementsRef,
		 where('userID', '==', currentUser.uid),
		 where('isActive', '==', false), // Filter for inactive announcements
		 limit(limitPerPage)
	  );
 
	  if (lastDoc) {
		 queryRef = query(queryRef, startAfter(lastDoc));
	  }
 
	  setIsLoading(true);
	  try {
		 const snapshot = await getDocs(queryRef);
		 const newAnnouncements = snapshot.docs.map((doc) => ({
			id: doc.id,
			...doc.data(),
		 }));
 
		 setAnnouncements((prevAnnouncements) => [...prevAnnouncements, ...newAnnouncements]);
 
		 if (snapshot.size > 0) {
			setLastDoc(snapshot.docs[snapshot.docs.length - 1]);
		 } else {
			setHasMore(false);
		 }
	  } catch (error) {
		 console.error('Error fetching announcements:', error);
	  } finally {
		 setIsLoading(false);
	  }
	};
 
	useEffect(() => {
	  if (currentUser) {
		 fetchAnnouncements()
			.then(() => {
			  setInitialFetchComplete(true);
			});
	  }
	}, [currentUser]);
 
	const handleLoadMore = () => {
	  if (hasMore && initialFetchComplete) {
		 fetchAnnouncements();
	  }
	};
 
	return {
	  announcements,
	  isLoading,
	  hasMore,
	  handleLoadMore,
	};
 };

 export default useDisabledAnnouncements