import Card from "../Card/index";
import List from "../List/index";
import {
    DragDropContext,
    Draggable,
    DraggableProvided,
    DraggableStateSnapshot,
} from "react-beautiful-dnd";
import {useState} from "react";
import {useEffectOnce} from "../../app/hooks/useEffectOnce";
import {WS} from "../../app/http/ws";
import {toast} from "react-toastify";

const Incorporate = () => {
    let socket: any = null;

    useEffectOnce(() => {
        const getWS = async () => {
            socket = await WS.getSocket()

            socket.on("connect", () => {
                socket.on('picked', (data: any) => {
                    toast(`The match is picked`, );
                })
                socket.on('moving', (data: any) => {
                    console.log({data})
                })
                socket.on('hadDone', (data: any) => {
                    toast(`The match is hadDone`, );
                })
                socket.on('finish', (data: any) => {
                    toast(`The match is Finish`, );
                })
            })
        }

        void getWS();
    });
    const itemsNormal = {
        available: [
            {
                id: 1,
                uuid: "7bfa4398a4477-888",
                title: "What is Lorem Ipsum?",
                subtitle: "Lorem Ipsum is simply dummy",
                updatedAt: "6 days ago",
            },
            {
                id: 2,
                uuid: "7bfa4398a448-999",
                title: "Why do we use it?",
                subtitle: "The point of using at its layout",
                updatedAt: "2 days ago",
            },
            {
                id: 3,
                uuid: "7bfa4398a449",
                title: "Where does it come from?",
                subtitle: "Contrary to popular belief, Lorem Ipsum is not simply",
                updatedAt: "3 days ago",
            },
            {
                id: 11,
                uuid: "7bfa4398a4477",
                title: "What is Lorem Ipsum?",
                subtitle: "Lorem Ipsum is simply dummy",
                updatedAt: "6 days ago",
            },
        ],

        assigned: [
            {
                id: 5,
                uuid: "7bfa4398a450",
                title: "Where can I get some?",
                subtitle: "There are many variations",
                updatedAt: "6 days ago",
            },
        ],
    };

    const [items, setItems] = useState(itemsNormal);

    const removeFromList = (list: any, index: any) => {
        const result = Array.from(list);
        const [removed] = result.splice(index, 1);
        return [removed, result];
    };

    const addToList = (list: any, index: any, element: any) => {
        const result = Array.from(list);
        result.splice(index, 0, element);
        return result;
    };

    const onDragEnd = (result: any) => {
        console.log({result})
        if (!result.destination) {
            console.log(result);
            return;
        }
        const listCopy: any = {...items};
        const sourceList = listCopy[result.source.droppableId];
        const [removedElement, newSourceList] = removeFromList(
            sourceList,
            result.source.index
        );
        listCopy[result.source.droppableId] = newSourceList;

        const destinationList = listCopy[result.destination.droppableId];
        listCopy[result.destination.droppableId] = addToList(
            destinationList,
            result.destination.index,
            removedElement
        );
        setItems(listCopy);
        onDone(result.draggableId)
    };

    /**
     * Socket
     */
    const onMove = async (e: any) => {
        const socket = await WS.getSocket()
        // socket.on("connect", () => {
            socket.emit('move', {x: e.clientX, y: e.clientY})
            console.log({x: e.clientX, y: e.clientY})
        // })
    }
    const onPick = async (item_id: number) => {
        const socket = await WS.getSocket()
        // socket.on("connect", () => {
            socket.emit('pick', item_id)
        // })
    }
    const onDone = async (item_id: number) => {
        const socket = await WS.getSocket()
        // socket.on("connect", () => {
            socket.emit('done', item_id)
        // });
    }

    return (
        <>
            <div onMouseMove={onMove}>
                <DragDropContext onDragEnd={onDragEnd} onDragStart={(result: any) => {
                    onPick(result.draggableId)
                }}>
                    <div className="flex p-12" >
                        <List title="Disponíveis" onDragEnd={onDragEnd} name="available">
                            {items.available.map((item, index) => (
                                <Draggable key={item.uuid} draggableId={item.id + ""} index={index}>
                                    {(
                                        provided: DraggableProvided | any,
                                        snapshot: DraggableStateSnapshot
                                    ) => (
                                        <div onClick={() => onPick(item.id)}
                                             ref={provided.innerRef}
                                             {...provided.draggableProps}
                                             {...provided.dragHandleProps}
                                        >
                                            <Card data={item}/>
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                        </List>
                        <List title="Atribuídos" onDragEnd={onDragEnd} name="assigned">
                            {items.assigned.map((item, index) => (
                                <Draggable draggableId={item.id + ""} index={index} key={item.uuid}>
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                        >
                                            <Card data={item}/>
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                        </List>
                    </div>
                </DragDropContext>
            </div>
        </>
    );
};

export default Incorporate;
