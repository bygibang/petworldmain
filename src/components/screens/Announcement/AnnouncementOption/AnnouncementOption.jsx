import cn from 'classnames'

const AnnouncementOption = ({ icon, title, option }) => {
	return (
		<div className={cn(
			'w-full flex items-start justify-between border-b border-text_grey-200/10 py-4',
			title === 'Здоровʼя' || title === 'Документи' ? 'flex-col gap-3' : 'flex'
		)}>
			<div className="flex items-center gap-2">
				<img src={icon} alt={title} />
				<h5 className="font-normal text-base">{title}</h5>
			</div>
			{typeof option === 'object' ? (
				<div className="flex items-center gap-2">
					{Object.entries(option).map(([key, value]) => (
						<div key={key}>
							{title === 'Здоровʼя' || title === 'Документи' ? (
								<p className="font-normal text-base border rounded-lg py-1 px-3 border-text_grey-200 ">{value}</p>
							) : (
								<p className="font-normal text-base ">{value}</p>
							)}
						</div>
					))}
				</div>
			) : (
				<p className='max-md:max-w-56 text-right'>{option}</p>
			)}
		</div>
	);
}
export default AnnouncementOption