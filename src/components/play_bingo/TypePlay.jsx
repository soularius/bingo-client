import React, { useState, useEffect } from 'react';

const classSend = "rounded-full bg-gradient-to-r from-purple-500 to-rose-500 hover:from-purple-600 hover:to-rose-500 py-2 px-3 font-normal font-sans text-white";
const classNotSend = "rounded-full bg-gradient-to-r from-purple-200 to-rose-200 hover:from-purple-300 hover:to-rose-200 py-2 px-3 font-normal font-sans text-white";
export const TypePlay = (props) => {

    const {
        bodyStompClient,
        serverResponse,
        onTypePlayChange,
        typePlayStatus
    } = props;

    const [typePlay, setTypePlay] = useState('full');
    const [typePlayCall, setTypePlayCall] = useState(false);

    const handleInputChange = (event) => {
        setTypePlay(event.target.value);
    };

    const handleSendTypePlay = async () => {
        const stompClient = bodyStompClient.current;
        await stompClient.send("/app/type-play", {}, JSON.stringify({ 'mode': typePlay }));
        console.log('[CLIENT TYPE PLAY] Sent message:', JSON.stringify({ 'mode': typePlay }));
    };

    useEffect(() => {
        if (serverResponse && serverResponse.type === 'type') {
            onTypePlayChange(typePlay, serverResponse.status);
            setTypePlayCall(true);
            console.log('[SERVER RESPONSE TYPE PLAY] Receive message:', serverResponse.status);
        }
    }, [bodyStompClient, serverResponse]);

    return (
        <section id="section-type" className="flex justify-center">
            <div className="bg-white light:bg-slate-900 rounded-lg px-4 py-4 ring-1 ring-slate-900/5 shadow-xl max-w-md mt-5 w-80">
                <fieldset className="flex justify-center flex-col">
                    <legend className="mb-3 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4 mr-1 fill-rose-500">
                            <path d="M11.25 5.337c0-.355-.186-.676-.401-.959a1.647 1.647 0 01-.349-1.003c0-1.036 1.007-1.875 2.25-1.875S15 2.34 15 3.375c0 .369-.128.713-.349 1.003-.215.283-.401.604-.401.959 0 .332.278.598.61.578 1.91-.114 3.79-.342 5.632-.676a.75.75 0 01.878.645 49.17 49.17 0 01.376 5.452.657.657 0 01-.66.664c-.354 0-.675-.186-.958-.401a1.647 1.647 0 00-1.003-.349c-1.035 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401.31 0 .557.262.534.571a48.774 48.774 0 01-.595 4.845.75.75 0 01-.61.61c-1.82.317-3.673.533-5.555.642a.58.58 0 01-.611-.581c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.035-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959a.641.641 0 01-.658.643 49.118 49.118 0 01-4.708-.36.75.75 0 01-.645-.878c.293-1.614.504-3.257.629-4.924A.53.53 0 005.337 15c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.036 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.369 0 .713.128 1.003.349.283.215.604.401.959.401a.656.656 0 00.659-.663 47.703 47.703 0 00-.31-4.82.75.75 0 01.83-.832c1.343.155 2.703.254 4.077.294a.64.64 0 00.657-.642z" />
                        </svg>
                        <strong className="font-sans font-extrabold text-rose-900 text-lg text-transparent bg-clip-text bg-gradient-to-r from-rose-600  to-lime-500 via-amber-600">Selecciona el tipo de juego</strong>
                    </legend>
                    <div className="grid grid-cols-2">
                        <div>
                            <input
                                id="full"
                                className="peer/full mr-2 accent-rose-500"
                                value="full"
                                type="radio"
                                name="status"
                                checked={typePlay === "full"}
                                onChange={handleInputChange}
                                disabled={serverResponse && serverResponse.status === 'OK'}
                            />
                            <label htmlFor="full" className="peer-checked/full:text-rose-600 font-sans font-semibold">FULL</label>
                        </div>
                        <div>
                            <input
                                id="normal"
                                className="peer/normal mr-2 accent-rose-500"
                                value="normal"
                                type="radio"
                                name="status"
                                checked={typePlay === "normal"}
                                onChange={handleInputChange}
                                disabled={serverResponse && serverResponse.status === 'OK'}
                            />
                            <label htmlFor="normal" className="peer-checked/normal:text-rose-600 font-sans font-semibold">NORMAL</label>
                        </div>
                    </div>
                    <button
                        onClick={handleSendTypePlay}
                        className={`mt-4 font-semibold 
                        ${serverResponse &&
                                serverResponse.status === 'OK' &&
                                typePlayStatus ?
                                classNotSend :
                                classSend}`
                        }
                        disabled={
                            serverResponse &&
                            serverResponse.status === 'OK' &&
                            typePlayStatus
                        }
                    >
                        Enviar
                    </button>
                </fieldset>
            </div>
        </section>
    );
}