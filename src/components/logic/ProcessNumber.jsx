import React, { useState, useEffect } from 'react';

const classSend = "rounded-full bg-gradient-to-r from-purple-500 to-rose-500 hover:from-purple-600 hover:to-rose-500 py-2 px-3 font-normal font-sans text-white";
const classNotSend = "rounded-full bg-gradient-to-r from-purple-200 to-rose-200 hover:from-purple-300 hover:to-rose-200 py-2 px-3 font-normal font-sans text-white";
const classBg = " bg-gradient-to-t from-emerald-300 to-cyan-300 font-normal font-sans text-white";


const initialState = {
    foundValue: null,
};

export const ProcessNumber = (props) => {
    const {
        serverResponse,
        bodyStompClient,
        onServerRefreshTableNumberSelect,
        copyTablePlayer,
        firstRow,
        onGameOver,
        onPlayerGame

    } = props;

    const [letterPlayer, setLetterPlayer] = useState(null);
    const [numberPlayer, setNumberPlayer] = useState(null);
    const [tableChange, setTableChange] = useState(JSON.parse(JSON.stringify(copyTablePlayer)));
    const [displayText, setDisplayText] = useState("Esperando numeros");
    const [displayNumber, setDisplayTNumber] = useState("");
    const [counter, setCounter] = useState(null);
    const [valSleep, setValSleep] = useState(5);
    const [updateNumber, setUpdateNumber] = useState(false);
    const [updateData, setUpdateData] = useState(false);
    const [updateTexts, setUpdateTexts] = useState(false);
    const [foundValue, setFoundValue] = useState(false);

    //const [foundValue, dispatch] = useReducer(foundValueReducer, initialState);

    const handleServerRefreshTableNumberSelect = async () => {
        const columnIndex = firstRow.indexOf(letterPlayer);
        let tableResp = [...tableChange];
        let foundSpace = false;

        for (const [rowIndex, row] of tableChange.entries()) {
            if (Number(row[columnIndex]) === Number(numberPlayer)) {
                tableResp[rowIndex][columnIndex] = -1;
                foundSpace = true;
                break; // Sal del bucle cuando se encuentre el número
            }
        }
        console.log("[FOUND] ");
        console.log(foundSpace);
        setTableChange(tableResp);
        return foundSpace;
    };

    const handleSetNumberResolve = async () => {
        if (serverResponse.other === null) {
            const stompClient = bodyStompClient.current;
            await stompClient.send("/app/get-number", {}, JSON.stringify({ 'letter': letterPlayer, 'number': numberPlayer, 'validate': foundValue }));
            console.log('[CLIENT SEND TABLE PLAY] Sent message:', JSON.stringify({ 'letter': letterPlayer, 'number': numberPlayer, 'validate': foundValue }));
            setLetterPlayer(null);
            setNumberPlayer(null);
        } else {
            console.log("[CLIENT] User Winner");
            onPlayerGame(serverResponse.other);
            onGameOver(true);
        }
    };

    useEffect(() => {
        if (serverResponse && serverResponse.type === 'bingo_number') {
            try {
                const messageObject = JSON.parse(serverResponse.message);
                console.log('[SERVER RESPONSE NUMBER PLAY] Receive message:', messageObject);
                console.log('[SERVER RESPONSE WINNER PLAY] Receive message:', serverResponse.other);
                setLetterPlayer(messageObject.letter);
                setNumberPlayer(messageObject.number);
            } catch (error) {
                console.error('Error parsing JSON:', error);
            }
        }
    }, [bodyStompClient, serverResponse]);

    useEffect(() => {
        const handleEffect = async () => {
            if (letterPlayer !== null && numberPlayer !== null) {
                console.log("UPDATE NUMBER");
                const found = await handleServerRefreshTableNumberSelect();
                setFoundValue(found);
                setUpdateData(true);
                console.log(letterPlayer);
                console.log(numberPlayer);
            }
        }
        handleEffect();
    }, [letterPlayer, numberPlayer]);

    useEffect(() => {
        if (updateData !== false) {
            console.log("UPDATE TEXT");
            (foundValue) ? setDisplayText("Lo tienes: ") : setDisplayText("Ups! No lo tienes: ");
            setDisplayTNumber(letterPlayer + numberPlayer);
            setUpdateData(false);
            setUpdateTexts(true);
        }
    }, [updateData]);

    useEffect(() => {
        const handleEffect = async () => {
            if (updateTexts) {
                await onServerRefreshTableNumberSelect(tableChange);
                console.log("UPDATE TABLE");
                setUpdateTexts(false);
            }
            setCounter(valSleep);
        }
        handleEffect();
    }, [updateTexts]);

    useEffect(() => {
        const handleEffect = async () => {
            console.log("Init counter");
            if (counter === null) return;
            console.log("Pass counter");

            if (counter > 0) {
                const timer = setTimeout(() => {
                    setCounter(counter - 1);
                }, 1000);
                return () => clearTimeout(timer);
            } else {
                setCounter(null);
                console.log("Exe counter");
                await handleSetNumberResolve();
            }
        };
        handleEffect();
    }, [counter]);

    return (
        <div id="alert-additional-content-4" className={`w-full rounded-lg px-4 py-4 ring-1 ring-slate-900/5 shadow-xl ${classBg}`} role="alert">
            <div className="flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-6 h-6 stroke-pink-700">
                    <path d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                </svg>
                <h3 className="ml-2 font-sans font-extrabold text-rose-900 text-xl text-transparent bg-clip-text bg-gradient-to-r from-pink-700 to-purple-600">
                    {displayText}
                </h3>

                <div className="m-2 flex justify-center relative items-center">
                    <div className=" w-max flex justify-center relative items-center">
                        <strong className="font-sans font-extrabold text-rose-900 text-xl text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-amber-800">
                            {displayNumber}
                        </strong>
                    </div>
                </div>
            </div>
        </div>);
}