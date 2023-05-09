import Column from "../components/Column";
import {DragDropContext} from "react-beautiful-dnd";
import {useState} from "react";
import styled from "styled-components";

const initialData: any = {
    tasks: {
        'task-1': {id: 'task-1', content: 'abc'},
        'task-2': {id: 'task-2', content: 'abc2'},
        'task-3': {id: 'task-3', content: 'abc3'},
        'task-4': {id: 'task-4', content: 'abc4'},
        'task-5': {id: 'task-5', content: 'abc5'},
    },
    columns: {
        'column-1': {
            id: 'column-1',
            title: 'to do',
            taskIds: ['task-1', 'task-2']
        },
        'column-2': {
            id: 'column-2',
            title: 'In progress',
            taskIds: []
        },
        'column-3': {
            id: 'column-3',
            title: 'Done',
            taskIds: []
        },
    },
    columnOrder: ['column-1', 'column-2', 'column-3']
}

const Container = styled.div`
  display: flex;
`;

export default function Bdg2() {
    const [tasks, setTasks] = useState(initialData.tasks)
    const [columns, setColumns] = useState<any>(initialData.columns)
    const [columnOrder, setColumnOrder] = useState(initialData.columnOrder)

    /**
     * Update data
     * @param result
     */
    const onDragEnd = (result: any) => {
        const { destination, source, draggableId } = result;

        if (!destination) {
            return;
        }

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        const start = columns[source.droppableId];
        const finish = columns[destination.droppableId];

        if (start === finish) {
            const newTaskIds = Array.from(start.taskIds);
            newTaskIds.splice(source.index, 1);
            newTaskIds.splice(destination.index, 0, draggableId);

            const newColumn = {
                ...start,
                taskIds: newTaskIds,
            };

            setColumns({
                ...columns,
                [newColumn.id]: newColumn,
            })

            return;
        }

        // Moving from one list to another
        const startTaskIds = Array.from(start.taskIds);
        startTaskIds.splice(source.index, 1);
        const newStart = {
            ...start,
            taskIds: startTaskIds,
        };

        const finishTaskIds = Array.from(finish.taskIds);
        finishTaskIds.splice(destination.index, 0, draggableId);
        const newFinish = {
            ...finish,
            taskIds: finishTaskIds,
        };

        setColumns({
            ...columns,
            [newStart.id]: newStart,
            [newFinish.id]: newFinish,
        })
    };

    return <>
        <DragDropContext
            onDragEnd={onDragEnd}
        >
            <Container>
                {
                    columnOrder.map((columnId: string) => {
                            const column = columns[columnId];
                            const tasksColumn = column.taskIds.map((taskId: string) => tasks[taskId]);

                            return <Column key={column.id} column={column} tasks={tasksColumn}/>;
                        }
                    )
                }
            </Container>
        </DragDropContext>
    </>
}