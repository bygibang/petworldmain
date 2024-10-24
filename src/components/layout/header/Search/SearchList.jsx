import { NavLink } from "react-router-dom"

const SearchList = ({ announcements }) => {
	return (
		<>
			{announcements.length > 0 &&
				<ul className="absolute w-full max-h-72 overflow-y-auto top-16 z-30 flex flex-col bg-background rounded-lg border border-text_grey-200/10 shadow-2xl">
					{announcements.map((announcement) => (
						<li key={announcement.id} >
							<NavLink to={`/announcement/${announcement.id}`} className="w-full flex items-start justify-between border-b border-text_grey-200/30 hover:bg-primary-100/40 p-5 gap-20">
								<div className="flex items-start gap-2">
									<img src={announcement.images[0]} alt="" className="w-20 rounded-md" />
									<h3 className="font-medium text-lg text-left w-3/4 overflow-hidden text-ellipsis">{announcement.title}</h3>
								</div>
								<div className="font-medium text-lg flex flex-col gap-2 text-right">
									<p>{announcement.location}</p>
									{announcement.price === 0 ? <p>Безкоштовно</p> : <p>₴{announcement.price}</p>}
								</div>
							</NavLink>
						</li>
					))}
				</ul>
			}
		</>
	)
}

export default SearchList