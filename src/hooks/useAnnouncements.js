import { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  query,
  limit,
  startAfter,
  getFirestore,
  where,
} from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../services/firebase.service";

const useAnnouncements = (limitPerPage = 3) => {
  const [announcements, setAnnouncements] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [lastDoc, setLastDoc] = useState(null);

  const app = initializeApp(firebaseConfig); // Assuming you have firebaseConfig defined
  const db = getFirestore(app);

  // Fetch initial announcements
  useEffect(() => {
    const fetchInitialAnnouncements = async () => {
      setIsLoading(true);
      try {
        await fetchAnnouncements(); // Trigger the initial fetch
      } catch (error) {
        console.error("Error fetching initial announcements:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialAnnouncements();
  }, []);

  // Function to fetch announcements with pagination
  const fetchAnnouncements = async () => {
    const announcementsRef = collection(db, "announcements");

    // Build the query using the query function
    let queryRef = query(
      announcementsRef,
      where("isActive", "==", true), // Filter for active announcements
      limit(limitPerPage) // Use the provided limit
    );

    if (lastDoc) {
      queryRef = query(queryRef, startAfter(lastDoc));
    }

    // Update hasMore before fetching
    setHasMore(true); // Assume there are more until proven otherwise

    // Fetch announcements
    const snapshot = await getDocs(queryRef);
    const newAnnouncements = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Update announcements state
    setAnnouncements((prevAnnouncements) => [
      ...prevAnnouncements,
      ...newAnnouncements,
    ]);

    // Store the last document ONLY if there are more documents to fetch
    if (snapshot.size > 0) {
      setLastDoc(snapshot.docs[snapshot.docs.length - 1]);
    } else {
      setHasMore(false); // No more announcements
    }
  };

  // Handle loading more announcements
  const handleLoadMore = () => {
    if (hasMore) {
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

export default useAnnouncements;
