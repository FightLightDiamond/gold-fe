import {memo} from 'react';
import styled from 'styled-components';
import Task from './Task';
import {Droppable} from "react-beautiful-dnd";

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
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
  display: flex;
`

const InnerList = ({tasks}: any & any[]) => {
    return tasks.map((task: any, index: number) => (
        <Task key={task.id} task={task} index={index} />
    ));
}

const areEqual = (prevProps: any, nextProps: any) => {
    return prevProps.tasks === nextProps.tasks;
}

const OnlyEvens = memo(InnerList, areEqual);

const Column2 = ({column, tasks, isDropDisabled}: {column: any, tasks: any[], isDropDisabled: boolean}) => {
    return (
        <Container>
            <Title>{column.title}</Title>
            {/*//Droppable //for // Draggable*/}
            <Droppable
                droppableId={column.id}
                // isDropDisabled={isDropDisabled}
                direction="horizontal"
            >
                {(provided, snapshot) => (
                    <TaskList
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        data-draggingover={snapshot.isDraggingOver}
                    >
                        {
                            <OnlyEvens tasks={tasks} />
                        }
                        {provided.placeholder}
                    </TaskList>
                )}
            </Droppable>
        </Container>
    )
}

export default memo(Column2)

