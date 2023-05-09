import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px
  [data-dragging="true"] {
    background: green
  }
`

const Task = ({task, index}: any) => {
    return <>
        <Draggable draggableId={task.id} index={index}>
            {(provided, snapshot) => (
                // snapshot - status
                <Container
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    data-dragging={snapshot.isDragging}
                >{task.content}</Container>
            )}
        </Draggable>
    </>

}

export default Task;