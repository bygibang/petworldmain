import ButtonMain from "../ui/buttonMain/ButtonMain"
import SelectBasic from "../ui/fields/selectBasic/selectBasic"
import SearchIcon from '@mui/icons-material/Search';
import MainBg from '../../public/Home/homeBgGirl.png'
import DogCatBg from '../../public/Home/AnimalsHomeBg.png'
import arrowBg from '../../public/Home/HomeArrowBg.svg'
import CatalogCard from "../ui/catalogCard/CatalogCard";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLocation, setPetType } from "../../store/filters/filtersSlice";
import { useState } from "react";
import MotionFrame from "../ui/motionFrame/MotionFrame";
import Search from "../layout/header/Search/Search";
import { location, petType } from "../../services/options.service";


const Home = ({ announcements, isLoading, hasMore, handleLoadMore, animalCounts }) => {
	const [selectedPetType, setSelectedPetType] = useState('');
	const [selectedLocation, setSelectedLocation] = useState('');
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleSearch = () => {
		dispatch(setPetType(selectedPetType));
		dispatch(setLocation(selectedLocation));
		navigate('/catalog', { state: { applyFilters: true } });
	};

	return (
		<>
			<div className="relative w-full h-full max-w-screen-3xl m-auto">
				<div className="w-full flex flex-col gap-44">
					<img src={MainBg} alt="" className="absolute right-0 top-0 max-xl:-z-10 max-xl:opacity-40 max-xl:blur-sm max-xl:h-full max-xl:w-full max-xl:object-cover" />
					<div className="w-1/2 py-36 pl-20 max-xl:w-full max-xl:py-44 max-xl:px-20">
						<h1 className="max-w-3xl text-black font-bold text-6xl mb-12 max-xl:text-3xl">Звідси починається найкраща дружба</h1>
						<div className="w-full flex items-center gap-5 max-md:flex-col max-md:items-start">
							<SelectBasic
								label="Вид тварини"
								list={petType}
								value={selectedPetType}
								onChange={(e) => setSelectedPetType(e.target.value)}
							/>
							<SelectBasic
								label="Локация"
								list={location}
								value={selectedLocation}
								onChange={(e) => setSelectedLocation(e.target.value)}
							/>
							<ButtonMain
								title="Шукати"
								icon={<SearchIcon />}
								onClick={handleSearch}
							/>
						</div>
						<h2 className="w-full text-center font-semibold text-xl my-6">або скористайтеся пошуком</h2>
						<div className="w-full flex self-center z-30">
							<Search />
						</div>
					</div>

					<img src={arrowBg} alt="" className="absolute left-0 top-1/2" />

					<div className="relative w-1/2 h-52 flex items-center justify-between bg-primary-200 pr-14 pl-28 rounded-r-3xl max-1xl:w-2/3 max-1xl:h-36 max-xl:pl-6 max-xl:pr-4 max-lg:w-full max-md:hidden">
						<img src={DogCatBg} alt="" className="absolute bottom-3/4 -z-10" />
						<ul className="w-full flex justify-between items-center">
							{petType.map((type) => (
								<li key={type} className="w-full flex flex-col justify-center items-center">
									<h3 className="font-normal text-5xl text-white max-lg:text-2xl">{animalCounts[type] || 0}</h3>
									<p className="font-normal text-2xl text-white max-lg:text-xl">{type}</p>
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>

			<div className="w-full flex flex-col max-w-screen-2xl m-auto max-2xl:px-5">
				<h3 className="font-normal text-4xl self-center mt-20 mb-10">Найновіші оголошення</h3>
				<MotionFrame
					key={announcements}
					lineY={0}
				>
					<div className="w-full flex flex-col items-center justify-center gap-10 mb-10">
						{announcements.length > 0 && (
							<div className="w-full h-full grid grid-cols-4 gap-5 max-xl:grid-cols-2 max-md:grid-cols-1 max-xl:gap-12">
								{announcements.map((announcement) => (
									<CatalogCard
										key={announcement.id}
										announcement={announcement}
									/>
								))}
							</div>
						)}
						<div className="w-full max-w-44">
							<ButtonMain
								onClick={handleLoadMore}
								disabled={!hasMore} // Disable if hasMore is false
								title="Показати ще"
							/>
						</div>
					</div>
				</MotionFrame>
			</div>
		</>
	)
}

export default Home