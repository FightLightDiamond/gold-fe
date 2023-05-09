//Initial References
import {useState} from "react";
import {MDBCol, MDBContainer, MDBRow} from "mdb-react-ui-kit";

export default function Flag() {
    const [count, setCount] = useState(0);

    const data = [
        "belgium",
        "bhutan",
        "brazil",
        "china",
        "cuba",
        "ecuador",
        "georgia",
        "germany",
        "hong-kong",
        "india",
        "iran",
        "myanmar",
        "norway",
        "spain",
        "sri-lanka",
        "sweden",
        "switzerland",
        "united-states",
        "uruguay",
        "wales",
    ];

    let deviceType = "";
    let initialX = 0,
        initialY = 0;
    let currentElement = "";
    let moveElement = false;

//Detect touch device
    const isTouchDevice = () => {
        try {
            //We try to create Touch Event (It would fail for desktops and throw error)
            document.createEvent("TouchEvent");
            deviceType = "touch";
            return true;
        } catch (e: any) {
            deviceType = "mouse";
            return false;
        }
    };

//Random value from Array
    const randomValueGenerator = () => {
        return data[Math.floor(Math.random() * data.length)];
    };

//Win Game Display
    const stopGame = () => {
        setHide('hide')
    };

//Drag & Drop Functions
    function dragStart(e: any) {
        console.log('dragStart')
        if (isTouchDevice()) {
            initialX = e.touches[0].clientX;
            initialY = e.touches[0].clientY;
            //Start movement for touch
            moveElement = true;
            currentElement = e.target;
        } else {
            //For non touch devices set data to be transfered
            e.dataTransfer.setData("text", e.target.id);
        }
    }

//Events fired on the drop target
    function dragOver(e: any) {
        e.preventDefault();
    }

//For touchscreen movement
    const touchMove = (e: any) => {
        console.log('touchMove')
        // if (moveElement) {
        //     e.preventDefault();
        //     let newX = e.touches[0].clientX;
        //     let newY = e.touches[0].clientY;
        //     let currentSelectedElement = document.getElementById(e.target.id);
        //
        //     currentSelectedElement.parentElement.style.top =
        //         currentSelectedElement.parentElement.offsetTop - (initialY - newY) + "px";
        //     currentSelectedElement.parentElement.style.left =
        //         currentSelectedElement.parentElement.offsetLeft -
        //         (initialX - newX) +
        //         "px";
        //     initialX = newX;
        //     initialY - newY;
        // }
    };

    const drop = (e: any) => {
        console.log('drop', e)
        e.preventDefault();
        // //For touch screen
        if (isTouchDevice()) {
            console.log('isTouchDevice')
        //     moveElement = false;
        //     //Select country name div using the custom attribute
        //     const currentDrop = document.querySelector(`div[data-id='${e.target.id}']`);
        //     //Get boundaries of div
        //     const currentDropBound = currentDrop.getBoundingClientRect();
        //     //if the position of flag falls inside the bounds of the countru name
        //     if (
        //         initialX >= currentDropBound.left &&
        //         initialX <= currentDropBound.right &&
        //         initialY >= currentDropBound.top &&
        //         initialY <= currentDropBound.bottom
        //     ) {
        //         currentDrop.classList.add("dropped");
        //         //hide actual image
        //         currentElement.classList.add("hide");
        //         currentDrop.innerHTML = ``;
        //         //Insert new img element
        //         currentDrop.insertAdjacentHTML(
        //             "afterbegin",
        //             `<img src= "${currentElement.id}.png">`
        //         );
        //         // count += 1;
        //         setCount(count + 1)
        //     }
        } else {
            console.log('isTouchDevicexxx')
            //Access data
            const draggedElementData = e.dataTransfer.getData("text");
            //Get custom attribute value
            const droppableElementData = e.target.getAttribute("data-id");
            if (draggedElementData === droppableElementData) {
                // const draggedElement = document.getElementById(draggedElementData);
                //dropped class
                e.target.classList.add("dropped");
                //hide current img
                // draggedElement.classList.add("hide");
                //draggable set to false
                // draggedElement.setAttribute("draggable", "false");
                e.target.innerHTML = ``;
                //insert new img
                e.target.insertAdjacentHTML(
                    "afterbegin",
                    `<img src="flag/${draggedElementData}.png">`
                );
                // count += 1;
                setCount(count + 1)
            }
        }
        //Win
        if (count === 3) {

            stopGame();
        }
    };

//Creates flags and countries

// eslint-disable-next-line react-hooks/rules-of-hooks
    const [randomData, setRandomData] = useState<string[]>([])
    const creator = () => {
        let randomData: string[] = [];
        //for string random values in array
        for (let i = 1; i <= 3; i++) {
            let randomValue = randomValueGenerator();
            if (!randomData.includes(randomValue)) {
                randomData.push(randomValue);
            } else {
                //If value already exists then decrement i by 1
                i -= 1;
            }
        }

        setRandomData(randomData)
    };

//Start Game
    const [hide, setHide] = useState<string>("")
    const startGame = async () => {
        setHide('hide')
        //This will wait for creator to create the images and then move forward
        await creator();
        setCount(0);
    }
    return (
        <>
            <MDBContainer>
                <h3>Drag & Drop The Flags Over Their Respective Country Names</h3>
                <div className={`controls-container ${hide}`}>
                    <p id="result">
                        {count === 3 ? 'You won' : ''}
                    </p>
                    <button className={hide} onClick={startGame} id="start">Start Game</button>
                </div>
                <MDBRow className="draggable-objects">
                    {randomData.map((i, key) =>
                        <MDBCol size='md' key={key}
                            onDragStart={dragStart}
                            onTouchStart={dragStart}
                            onTouchEnd={drop}
                            onTouchMove={touchMove}
                            className="draggable-image" draggable="true"
                        >
                            <img src={`flag/${i}.png`} id={i} alt={i}/>
                        </MDBCol>)
                    }
                </MDBRow>
                <MDBRow className="drop-points">
                    {
                        randomData.sort(() => 0.5 - Math.random()).map((i, key) =>
                            <MDBCol key={key}>
                                <div onDragOver={dragOver} onDrop={drop} className="countries" data-id={i}>
                                    {i.charAt(0).toUpperCase() + i.slice(1).replace("-", " ")}
                                </div>
                            </MDBCol>
                        )
                    }
                </MDBRow>

            </MDBContainer>

        </>
    )
}