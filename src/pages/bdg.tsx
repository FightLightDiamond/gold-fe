import Column from "../components/Column";
import {DragDropContext} from "react-beautiful-dnd";

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
    const onDragEnd = (result: any) => {
        // TODO: reorder our column
    };

    return <>
        <DragDropContext onDragEnd={onDragEnd}>
            {
                initialData.columnOrder.map((columnId: string) => {
                        const column = initialData.columns[columnId];
                        const tasks = column.taskIds.map((taskId: string) => initialData.tasks[taskId]);

                        return <Column key={column.id} column={column} tasks={tasks}/>;
                    }
                )
            }
        </DragDropContext>
    </>
}