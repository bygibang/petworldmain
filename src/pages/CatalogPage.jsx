import { useState, useEffect } from 'react';
import { collection, getDocs, where, query } from 'firebase/firestore';
import Catalog from '../components/screens/Catalog/Catalog';
import { db } from '../services/firebase.service';
import { useSelector } from 'react-redux';

const units = {
	"Днів": 1,
	"Тижнів": 7,
	"Місяців": 30, // 4 недели в месяце
	"Років": 365 // 12 месяцев * 4 недели в месяце
};

const ageRanges = {
	"<6 мicяцiв": { min: 0, max: 179 }, // Примерно 6 месяцев в днях
	"вiд 6 до 12 мicяцiв": { min: 180, max: 359 }, // Примерно 6-12 месяцев в днях
	"вiд 1 до 2 рокiв": { min: 360, max: 719 }, // Примерно 1-2 года в днях
	"вiд 2 рокiв": { min: 720, max: Infinity } // Более 2 лет в днях
};

const CatalogPage = () => {
	const [announcements, setAnnouncements] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [filteredAnnouncements, setFilteredAnnouncements] = useState([]); // State for filtered announcements
	const filters = useSelector((state) => state.filters);
	const [hasFiltersApplied, setHasFiltersApplied] = useState(false);
	const [sorting, setSorting] = useState('');


	useEffect(() => {
		// Sort the announcements array based on the sorting option
		const sortedAnnouncements = [...announcements].sort((a, b) => {
			if (sorting === 'Найновіші') {
				return b.createdOn - a.createdOn; // Sort by createdOn descending
			} else if (sorting === 'Від дешевих до дорогих') {
				return a.price - b.price; // Sort by price ascending
			} else if (sorting === 'Від дорогих до дешевих') {
				return b.price - a.price; // Sort by price descending
			} else {
				return 0; // Default sorting
			}
		});
		setAnnouncements(sortedAnnouncements);

		// Sort the filteredAnnouncements array based on the sorting option
		const sortedFilteredAnnouncements = [...filteredAnnouncements].sort((a, b) => {
			if (sorting === 'Найновіші') {
				return b.createdOn - a.createdOn; // Sort by createdOn descending
			} else if (sorting === 'Від дешевих до дорогих') {
				return a.price - b.price; // Sort by price ascending
			} else if (sorting === 'Від дорогих до дешевих') {
				return b.price - a.price; // Sort by price descending
			} else {
				return 0; // Default sorting
			}
		});
		setFilteredAnnouncements(sortedFilteredAnnouncements);
	}, [sorting, announcements, filteredAnnouncements]);

	useEffect(() => {
		if (!hasFiltersApplied) { // Check if hasFiltersApplied is false
			const fetchAnnouncements = async () => {
				setIsLoading(true);
				try {
					// Fetch all announcements
					const q = query(collection(db, 'announcements'), where('isActive', '==', true));
					const querySnapshot = await getDocs(q);
					const fetchedAnnouncements = querySnapshot.docs.map((doc) => ({
						id: doc.id,
						...doc.data(),
					}));
					// Update state
					setAnnouncements(fetchedAnnouncements); // Correctly update announcements
					setTotalPages(Math.ceil(fetchedAnnouncements.length / 3));
				} catch (error) {
					console.error('Error fetching announcements:', error);
				} finally {
					setIsLoading(false);
				}
			};
			fetchAnnouncements();
		}
	}, [hasFiltersApplied]);

	const handleApplyFilters = (e) => {
		e.preventDefault()
		setIsLoading(true);
		setHasFiltersApplied(true)
		try {
			const filtered = applyFilters(announcements);
			setFilteredAnnouncements(filtered);
			setTotalPages(Math.ceil(filtered.length / 3));
		} catch (error) {
			console.error('Error fetching filtered announcements:', error);
		} finally {
			setIsLoading(false);
		}
	}

	const applyFilters = (announcements) => {
		let filtered = [...announcements]; // Start with all announcements

		if (filters.petType) {
			filtered = filtered.filter((announcement) => announcement.petType === filters.petType);
		}
		if (filters.breed) {
			filtered = filtered.filter((announcement) => announcement.breed === filters.breed);
		}
		if (filters.location) {
			filtered = filtered.filter((announcement) => announcement.location === filters.location);
		}
		if (filters.userType) {
			filtered = filtered.filter((announcement) => announcement.userType === filters.userType);
		}
		if (filters.isFree) {
			filtered = filtered.filter((announcement) => announcement.price === 0);
		}
		if (filters.gender) {
			filtered = filtered.filter((announcement) => announcement.gender === filters.gender);
		}
		if (filters.maxPrice || filters.minPrice) {
			filtered = filtered.filter((announcement) => {
				const priceValue = parseFloat(announcement.price);
				const minValue = parseFloat(filters.minPrice);
				const maxValue = parseFloat(filters.maxPrice);
				return minValue <= priceValue && priceValue <= maxValue;
			});
		}
		if (filters.age) {
			const ageRange = ageRanges[filters.age];
			if (ageRange) {
				filtered = filtered.filter((announcement) => {
					const ageValue = announcement.age.value;
					const ageUnit = announcement.age.type;
					const ageInDays = ageValue * units[ageUnit];
					return ageInDays >= ageRange.min && ageInDays <= ageRange.max;
				});
			}
		}
		if (filters.health.length > 0) {
			filtered = filtered.filter((announcement) => filters.health.some((health) => announcement.health.includes(health)));
		}
		if (filters.documents.length > 0) {
			filtered = filtered.filter((announcement) => filters.documents.some((document) => announcement.documents.includes(document)));
		}

		return filtered;
	};

	const handlePageChange = (event, newPage) => {
		setCurrentPage(newPage);
	};
	const paginatedAnnouncements = announcements.slice(
		(currentPage - 1) * 3,
		currentPage * 3
	);
	const paginatedFilteredAnnouncements = filteredAnnouncements.slice(
		(currentPage - 1) * 3,
		currentPage * 3
	);
	return (
		<Catalog
			announcements={paginatedAnnouncements}
			isLoading={isLoading}
			currentPage={currentPage}
			handlePageChange={handlePageChange}
			totalPages={totalPages}
			handleApplyFilters={handleApplyFilters}
			filteredAnnouncements={paginatedFilteredAnnouncements}
			hasFiltersApplied={hasFiltersApplied}
			setHasFiltersApplied={setHasFiltersApplied}
			sorting={sorting}
			setSorting={setSorting}
		/>
	);
};

export default CatalogPage







