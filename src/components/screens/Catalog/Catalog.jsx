import CatalogCard from "../../ui/catalogCard/CatalogCard"
import PaginationItems from "../../ui/pagination/PaginationItems"
import Filters from "./filters/Filters";
import Loader from "../../ui/loader/Loader";
import MobileFilters from "./mobileFilters/MobileFilters";
import { sortingOptions } from "../../../services/options.service";
import SelectBasic from "../../ui/fields/selectBasic/selectBasic";
import Search from "../../layout/header/Search/Search";


const Catalog = ({
	announcements,
	isLoading,
	currentPage,
	handlePageChange,
	totalPages,
	handleApplyFilters,
	filteredAnnouncements,
	hasFiltersApplied,
	setHasFiltersApplied,
	sorting,
	setSorting
}) => {

	return (
		<div className="w-full mt-6 mb-24 flex flex-col">
			<div className="w-1/2 flex self-center mb-24 max-w-screen-lg m-auto max-2xl:px-5 max-lg:w-full">
				<Search />
			</div>
			<div className="w-full flex items-start justify-between max-w-screen-2xl m-auto max-2xl:px-5">
				<h1 className="flex text-xl font-semibold self-end mb-4 max-lg:hidden">Фільтри</h1>
				<div className="w-1/4 mb-4 max-extramd:w-full">
					<SelectBasic
						label="Сортувати за"
						list={sortingOptions}
						name="sorting"
						value={sorting}
						onChange={(e) => setSorting(e.target.value)}
					/>
				</div>
			</div>
			<div className="w-full flex items-start justify-between gap-10 max-w-screen-2xl m-auto max-2xl:px-5">
				<div className="w-1/4 max-lg:hidden">
					<Filters
						handleApplyFilters={handleApplyFilters}
						setHasFiltersApplied={setHasFiltersApplied}
					/>
				</div>

				<div className="w-full h-full flex flex-col items-center justify-center gap-10 mb-10">
					{isLoading ? (
						<Loader />
					) : (
						<>
							<div className="w-full flex flex-col">
								<MobileFilters
									handleApplyFilters={handleApplyFilters}
									setHasFiltersApplied={setHasFiltersApplied}
								/>
								{hasFiltersApplied ? ( // Check if filters are applied
									filteredAnnouncements.length > 0 ? ( // If filtered results exist
										<div className="grid grid-cols-3 gap-5 max-extramd:grid-cols-1">
											{filteredAnnouncements.map((announcement) => (
												<CatalogCard key={announcement.id} announcement={announcement} />
											))}
										</div>
									) : ( // If no filtered results
										<h2 className="text-center text-gray-500 font-medium text-xl">
											На ваш запит нічого не знайдено :(
										</h2>
									)
								) : ( // If no filters are applied
									<div className="grid grid-cols-3 gap-5 max-extramd:grid-cols-1">
										{announcements.map((announcement) => (
											<CatalogCard key={announcement.id} announcement={announcement} />
										))}
									</div>
								)}
							</div>
						</>
					)}
					<PaginationItems
						currentPage={currentPage}
						handlePageChange={handlePageChange}
						totalPages={totalPages}
					/>
				</div>
			</div>
		</div>
	);
};

export default Catalog





