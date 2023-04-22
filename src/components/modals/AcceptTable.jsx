import React, { Fragment, useRef, useState, useEffect } from 'react';
import { StartPlayLoad } from './StartPlayLoad';
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'

const classSend = "rounded-full bg-gradient-to-r from-purple-500 to-rose-500 hover:from-purple-600 hover:to-rose-500 py-2 px-3 font-normal font-sans text-white";
const classNotSend = "rounded-full bg-gradient-to-r from-purple-200 to-rose-200 hover:from-purple-300 hover:to-rose-200 py-2 px-3 font-normal font-sans text-white";
const classBg = " bg-gradient-to-t from-yellow-300 to-rose-300 font-normal font-sans text-white";
export const AcceptTable = (props) => {

    const {
        serverResponse,
        bodyStompClient,
        onServerRefreshTable,
        modePlayer,
        onStartPlayer
    } = props;

    const [waitPlayer, setWaitPlayer] = useState(false);

    const handleSetRefreshTable = async () => {
        const stompClient = bodyStompClient.current;
        await stompClient.send("/app/refresh-table", {}, JSON.stringify({ 'mode': modePlayer }));
        console.log('[CLIENT REFRESH TABLE] Sent message:', JSON.stringify({ 'mode': modePlayer }));
    };

    const handleSetAcceptTable = async () => {
        const stompClient = bodyStompClient.current;
        await stompClient.send("/app/accept-table", {}, JSON.stringify({ 'accept': true }));
        console.log('[CLIENT ACCEPT TABLE PLAY] Sent message:', JSON.stringify({ 'accept': true }));
        setWaitPlayer(true);
    };

    const handleSetWaitPlayer = (waitPlayer, StartPlayer) => {
        setWaitPlayer(waitPlayer);
        onStartPlayer(StartPlayer);
    }

    useEffect(() => {
        if (serverResponse && serverResponse.type === 'refresh_table') {
            onServerRefreshTable(JSON.parse(serverResponse.message));
            console.log('[SERVER RESPONSE TYPE PLAY] Receive message:', serverResponse.status);
        }
    }, [bodyStompClient, serverResponse]);

    return (
        <>
            {waitPlayer ?
                <StartPlayLoad
                    serverResponse={serverResponse}
                    bodyStompClient={bodyStompClient}
                    onWaitPlayer={handleSetWaitPlayer}
                />
                : null
            }
            <div id="alert-additional-content-4" className={`w-full rounded-lg px-4 py-4 ring-1 ring-slate-900/5 shadow-xl ${classBg}`} role="alert">
                <div className="flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-6 h-6 stroke-lime-700">
                        <path d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                    </svg>
                    <h3 className="font-sans font-extrabold text-rose-900 text-xl text-transparent bg-clip-text bg-gradient-to-r from-lime-700 to-purple-600">¡OYE! ¿Este tablero te gusta?</h3>
                </div>
                <div className="flex items-center justify-around mt-3">
                    <button
                        type="button"
                        className="text-white rounded-full font-sans flex bg-gradient-to-r from-lime-500  to-blue-500 py-2 px-4"
                        onClick={() => handleSetAcceptTable()}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 mr-1">
                            <path d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
                            <path d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z" />
                        </svg>
                        ¡SI!
                    </button>
                    <button
                        type="button"
                        className="text-white rounded-full font-sans flex bg-gradient-to-r from-rose-500  to-blue-500 py-2 px-4"
                        onClick={handleSetRefreshTable}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 mr-1">
                            <path d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3" />
                        </svg>
                        Generar Otro
                    </button>
                </div>
            </div>
        </>
    );
}