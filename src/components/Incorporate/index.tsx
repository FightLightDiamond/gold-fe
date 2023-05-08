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
import {MDBBtn, MDBIcon} from "mdb-react-ui-kit";

const Incorporate = () => {

    const [gameInfo, setGameInfo] = useState<any>({})
    const [x, setX] = useState(0)
    const [y, setY] = useState(0)
    const [socket, setSocket] = useState<any>(null)
    const [shapes, setShapes] = useState<any>([])

    const setMousePosition = (e: any) => {
        const {clientX, clientY} = e

        // if (Math.abs(x - clientX) > 5 || Math.abs(y - clientY) > 5) {
            setX(clientX)
            setY(clientY)
        // }
    }

    useEffectOnce(() => {
        const getWS = async () => {
            const socket = await WS.getSocket()
            setSocket(socket)

            socket.on("connect", () => {
                socket.on('joinedRoom', (data: any) => {
                    toast("joinedRoom");
                })
                socket.on('gameInfo', (gameInfo: any) => {
                    console.log({gameInfo})
                    setGameInfo(gameInfo)
                })
                socket.on('roomFull', (data: any) => {
                    toast("roomFull");
                })
                socket.on('gameStart', (data: any) => {
                    console.log({data})
                    setShapes(data.items)
                    toast("gameStart");
                })
                socket.on('picked', (data: any) => {
                    toast(`The match is picked`,);
                })
                socket.on('moving', (data: any) => {
                    data.members.map((member: any) => {
                        if(socket.id !== member.id) {
                            const {mouse} = member
                            setX(mouse.x)
                            setY(mouse.y)
                        }
                    })

                    setShapes(data.items)
                })
                socket.on('hadDone', (data: any) => {
                    toast(`The match is hadDone`,);
                })
                socket.on('finish', (data: any) => {
                    toast(`The match is Finish`,);
                })
                socket.on('clearRoomSuccess', (data: any) => {
                    toast(`clearRoomSuccess`,);
                })
                socket.on('hadResetItem', (data: any) => {
                    toast(`hadResetItem`,);
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

    /**
     * Remove From List
     * @param list
     * @param index
     */
    const removeFromList = (list: any, index: any) => {
        const result = Array.from(list);
        const [removed] = result.splice(index, 1);
        return [removed, result];
    };

    /**
     * add To List
     * @param list
     * @param index
     * @param element
     */
    const addToList = (list: any, index: any, element: any) => {
        const result = Array.from(list);
        result.splice(index, 0, element);
        return result;
    };

    /**
     * on Drag End
     * @param result
     */
    const onDragEnd = (result: any) => {
        console.log("onDragEnd", {result})
        if (!result.destination) {
            console.log("destination", result);
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
        socket.emit('move', {x: e.clientX, y: e.clientY})
        // socket.emit('move', {x: e.clientX, y: e.clientY})
    }

    /**
     * onPick
     * @param item_id
     */
    const onPick = async (item_id: number) => {
        const socket = await WS.getSocket()
        socket.emit('pick', item_id)
    }

    /**
     * onPick
     * @param item_id
     */
    const onResetItem = async (item_id: number) => {
        const socket = await WS.getSocket()
        socket.emit('resetItem', item_id)
    }

    /**
     * onDone
     * @param item_id
     */
    const onDone = async (item_id: number) => {
        const socket = await WS.getSocket()
        socket.emit('done', item_id)
    }

    /**
     * joinRoom
     */
    const joinRoom = async () => {
        const socket = await WS.getSocket()
        socket.emit("joinRoom", "match");
    }

    const clearRoom = () => {
        socket.emit("clearRoom", "match");
    }

    return (
        <>
            <div className={'element'} onMouseMove={setMousePosition}>
                <span style={{left: x, top: y}} className={'cursor'}><MDBIcon fas icon="allergies"/></span>
                <div><>{JSON.stringify(gameInfo)}</></div>
                <div><>{JSON.stringify(shapes)}</></div>
                <MDBBtn onClick={joinRoom}>Join Room {socket?.id}</MDBBtn>
                <MDBBtn onClick={clearRoom}>End Room</MDBBtn>
                <div>
                    {shapes.map((shape: any) => <div key={shape.id}>
                        <MDBBtn onClick={() => onPick(shape.id)}>Pick {shape?.id}</MDBBtn>
                        <MDBBtn onClick={() => onResetItem(shape.id)}>Remove {shape?.id}</MDBBtn>
                        <MDBBtn onClick={() => onDone(shape.id)}>DoneJoin {shape?.id}</MDBBtn>
                    </div>)}
                </div>
                <DragDropContext onDragEnd={onDragEnd} onDragStart={(result: any) => {
                    onPick(result.draggableId)
                }}>
                    <div className="flex p-12" onMouseMove={onMove}>
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
