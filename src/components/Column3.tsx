import {memo} from 'react';
import styled from 'styled-components';
import {Droppable, Draggable} from "react-beautiful-dnd";
import Task3 from "./Task3";

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  background-color: white;
  border-radius: 2px;
  width: 220px;

  display: flex;
  flex-direction: column;
`
const Title = styled.h3`
  padding: 8px;
`
const TaskList = styled.div`
  padding: 8px;
  transition: background-color 0.2s ease;
  flex-grow: 1;
  min-height: 100px;
`

const InnerList = ({tasks}: any & any[]) => {
    return tasks.map((task: any, index: number) => (
        <Task3 key={task.id} task={task} index={index}/>
    ));
}

const areEqual = (prevProps: any, nextProps: any) => {
    return prevProps.tasks === nextProps.tasks;
}

const OnlyEvens = memo(InnerList, areEqual);

const Column3 = ({column, tasks, isDropDisabled, index}: {
    column: any,
    tasks: any[],
    isDropDisabled?: boolean,
    index: number
}) => {
    return (
        <Draggable draggableId={column.id} index={index}>
            {(provided) => (
                <Container
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                >
                    <Title {...provided.dragHandleProps}>{column.title}</Title>
                    {/*//Droppable //for // Draggable*/}
                    <Droppable
                        droppableId={column.id}
                        type="task"
                    >
                        {(provided, snapshot) => (
                            <TaskList
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                data-draggingover={snapshot.isDraggingOver}
                            >
                                {
                                    <OnlyEvens tasks={tasks}/>
                                }
                                {provided.placeholder}
                            </TaskList>
                        )}
                    </Droppable>
                </Container>
            )}
        </Draggable>
    )
}

export default memo(Column3)

