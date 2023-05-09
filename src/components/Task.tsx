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

const Handle = styled.div`
    width: 20px;
    height: 20px;
    background-color: orange;
    border-radius: 4px;
    margin-right: 8px;
`;

const Task = ({task, index}: any) => {
    const isDragDisabled = task.id === 'task-1';

    return <>
        <Draggable
            draggableId={task.id}
            index={index}
            isDragDisabled={isDragDisabled}
        >
            {(provided, snapshot) => (
                // snapshot - status
                <Container
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    data-dragging={snapshot.isDragging}
                >
                    <Handle {...provided.dragHandleProps}>
                        {task.content}
                    </Handle>
                </Container>
            )}
        </Draggable>
    </>

}

export default Task;