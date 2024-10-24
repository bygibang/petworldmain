import {Droppable, Draggable} from 'react-beautiful-dnd';

const SortableBox = ({ files, imageURLs }) => {

	console.log(files)
	return (
	  <Droppable droppableId="images">
		 {(provided) => (
			<div
			  {...provided.droppableProps}
			  ref={provided.innerRef}
			  style={{
				 display: 'flex',
				 flexDirection: 'row',
				 width: '100%',
			  }}
			>
			  {imageURLs.map((imageUrl, index) => (
				 <Draggable key={imageUrl} draggableId={imageUrl} index={index}>
					{(provided) => (
					  <div
						 {...provided.draggableProps}
						 {...provided.dragHandleProps}
						 ref={provided.innerRef}
						 style={{
							display: 'flex',
							alignItems: 'center',
							padding: '10px',
							margin: '5px 0',
							backgroundColor: '#f5f5f5',
							borderRadius: '4px',
							cursor: 'move',
						 }}
					  >
						 <img src={imageUrl} alt="Uploaded Image" style={{ width: '200px', height: '200px', marginRight: '10px' }} />
					  </div>
					)}
				 </Draggable>
			  ))}
			  {provided.placeholder}
			</div>
		 )}
	  </Droppable>
	);
 };
export default SortableBox