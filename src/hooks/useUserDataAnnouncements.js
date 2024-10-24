import { initializeApp } from "firebase/app";
import { doc, getDoc,getFirestore} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { firebaseConfig } from "../services/firebase.service";

const useUserData = () => {
	const [userData, setUserData] = useState(null);
	const currentUser = useSelector((store) => store.user.user.isUser);
 
	const app = initializeApp(firebaseConfig);
	const db = getFirestore(app);
 
	const fetchUserData = async () => {
	  if (currentUser) {
		 const userDocRef = doc(db, 'users', currentUser.uid);
		 const userDoc = await getDoc(userDocRef);
		 if (userDoc.exists()) {
			setUserData(userDoc.data());
		 } else {
			console.log('User not found');
		 }
	  }
	};
 
	useEffect(() => {
	  if (currentUser) {
		 fetchUserData();
	  }
	}, [currentUser]);
 
	return { userData };
 };

 export default useUserData