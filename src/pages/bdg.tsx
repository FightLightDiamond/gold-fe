import Column from "../components/Column";
import {DragDropContext} from "react-beautiful-dnd";
import {use} from "i18next";
import {useState} from "react";

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
        }
    },
    columnOrder: ['column-1']
}
export default function Bdg() {
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

        const column = columns[source.droppableId];
        const newTaskIds = Array.from(column.taskIds);
        newTaskIds.splice(source.index, 1);
        newTaskIds.splice(destination.index, 0, draggableId);

        const newColumn = {
            ...column,
            taskIds: newTaskIds,
        };

        setColumns({
            ...columns,
            [newColumn.id]: newColumn,
        })
    };

    return <>
        <DragDropContext onDragEnd={onDragEnd}>
            {
                columnOrder.map((columnId: string) => {
                        const column = columns[columnId];
                        const tasksColumn = column.taskIds.map((taskId: string) => tasks[taskId]);

                        return <Column key={column.id} column={column} tasks={tasksColumn}/>;
                    }
                )
            }
        </DragDropContext>
    </>
}