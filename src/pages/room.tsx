
import { socket } from "../app/http/ws";
import { useEffectOnce } from "../app/hooks/useEffectOnce";

const Room = () => {
    useEffectOnce(() => {
        socket.emit("joinRoom", "match");
        socket.emit("joinRoom", "all");
        socket.on("joinedRoom", data => alert(data));
        socket.on("betting", data => {
            console.log(data);
            alert("betting");
        });
        socket.on("matching", data => {
            console.log(data);
            alert("matching");
        });
        socket.on("reward", data => {
            console.log(data);
            alert("reward");
        });
    });

    return (
        <div className={"container"}>
            <h1>Room</h1>
        </div>
    );
};

export default Room;
