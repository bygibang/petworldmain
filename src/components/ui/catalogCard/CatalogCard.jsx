import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import FemaleOutlinedIcon from '@mui/icons-material/FemaleOutlined';
import { Link } from 'react-router-dom';
import CreateIcon from '@mui/icons-material/Create';

const CatalogCard = ({ announcement, isUser }) => {
	return (
		<Link
			to={`/announcement/${announcement.id}`}
			className="w-full h-full bg-white border border-border rounded-2xl shadow-xl relative hover:border-primary-100/60 hover:scale-105 transition-all duration-300 hover:bg-primary-200/5" // Use w-full for full width
		>
			{isUser && <CreateIcon className='w-10 h-10 p-2 absolute z-10 top-3 right-3 text-primary-100 rounded-full bg-white/40 backdrop-blur-sm ' />}
			<img
				src={announcement.images[0]}
				alt="редактирование"
				className="w-full h-64 max-extramd:h-96 object-cover rounded-t-2xl"
			/>
			<div className="flex flex-col items-start p-4">
				<h2 className="font-medium text-lg mb-5 line-clamp-2 h-16">{announcement.title}</h2>
				<div className="flex flex-col gap-1 mb-4">
					<div className="flex items-center gap-1">
						<FmdGoodOutlinedIcon className="text-primary-100" />
						<p className="font-normal text-text_grey-200 text-sm">
							{announcement.location}
						</p>
					</div>
					<div className="flex items-center gap-1">
						<FemaleOutlinedIcon className="text-primary-100" />
						<p className="font-normal text-text_grey-200 text-sm">
							{announcement.gender}
						</p>
					</div>
					<div className="flex items-center gap-1">
						<CalendarMonthOutlinedIcon className="text-primary-100" />
						<p className="font-normal text-text_grey-200 text-sm">
							{announcement.age.value} {announcement.age.type}
						</p>
					</div>
				</div>
				{announcement.price === "0" ? (
					<h3 className="font-medium text-xl self-end">Безкоштовно</h3>
				) : (
					<h3 className="font-medium text-xl self-end">₴ {announcement.price}</h3>
				)}
			</div>
		</Link>
	);
};

export default CatalogCard;