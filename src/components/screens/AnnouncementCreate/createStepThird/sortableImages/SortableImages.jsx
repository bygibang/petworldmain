import { useSortable } from "@dnd-kit/sortable"
import { CSS } from '@dnd-kit/utilities'


const SortableImages = ({ imageURLs, id }) => {
	const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id })
	const style = {
		transition,
		transform: CSS.Transform.toString(transform)
	}
	return (
		<div
			ref={setNodeRef}
			{...attributes}
			{...listeners}
			style={style}
			className="w-20"
		>
			{imageURLs.map((url,id) => (
				<img key={id} src={url} alt="" />
			))}
		</div>
	)
}

export default SortableImages