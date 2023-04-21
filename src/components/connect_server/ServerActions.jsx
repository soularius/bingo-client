import React, { useRef, useState, useReducer } from 'react';
import PropTypes from 'prop-types';
import SockJS from 'sockjs-client/dist/sockjs';
import Stomp from 'stompjs';

const classNotConnected = "rounded-full bg-gradient-to-r from-pink-500 to-yellow-500 hover:from-rose-600 hover:to-amber-500 py-2 px-3 font-normal font-sans text-white";
const classConnected = "rounded-full bg-gradient-to-r from-pink-200 to-yellow-200 hover:from-rose-300 hover:to-amber-200 py-2 px-3 font-normal font-sans text-white";

const classNotDisconnected = "rounded-full bg-gradient-to-r from-lime-600 to-yellow-500 hover:from-lime-700 hover:to-amber-500 py-2 px-3 font-normal font-sans text-white";
const classDisconnected = "rounded-full bg-gradient-to-r from-lime-300 to-yellow-200 hover:from-lime-400 hover:to-amber-200 py-2 px-3 font-normal font-sans text-white";

const initialState = {
    connected: false,
    disconnected: true
};

const reducer = (state, action) => {
    switch (action.type) {
        case "connected":
            return {
                ...state,
                connected: true,
                disconnected: false
            };
        case "disconnected":
            return {
                ...state,
                connected: false,
                disconnected: true
            };
        default:
            throw new Error();
    }
};

export const ServerActions = (props) => {

    const { onConnectChange, uuid, onServerResponse } = props;
    const [state, dispatch] = useReducer(reducer, initialState);
    const stompClientRef = useRef(null);

    const reInitSystem = async (connected) => {
        await onConnectChange({
            newConnected: connected,
            newStompClient: stompClientRef,
            typeMode: null,
            typeModeStatus: null,
            newNamePlay: null,
            newNamePlayStatus: null,
            newTablePlayer: null,
            newModePlayer: null,
            newStartPlayer: false,
            newInitPlay: false
        });
    };

    const handleConnect = async () => {
        const socket = new SockJS(import.meta.env.VITE_SOCK_JS_SERVER);
        const stompClient = Stomp.over(socket);
        await stompClient.connect({ uuid }, async (frame) => {
            dispatch({ type: "connected" });
            await reInitSystem(true);

            console.log("Connected: " + frame);

            const sessionId = socket._transport.url.split("/")[5];

            console.log("Session ID: " + sessionId); // Muestra el sessionId
            console.log("Session UUID: " + uuid); // Muestra el sessionId

            stompClient.subscribe(`/topic/user/${uuid}/responses`, async (greeting) => {
                const messageBody = JSON.parse(greeting.body);
                console.log('[RECEIVE] :', messageBody);
                await onServerResponse(messageBody);
            });

            stompClient.subscribe(`/topic/user/${sessionId}/responses`, async (greeting) => {
                const messageBody = JSON.parse(greeting.body);
                console.log('[RECEIVE] :', messageBody);
                await onServerResponse(messageBody);
            });
        }, async (error) => {
            console.log('[CLIENT] Subscription error:', error);
            await handleDisconnect();
        });
        stompClientRef.current = stompClient;
        props.setStompClient(stompClientRef);
    }

    const handleDisconnect = async () => {
        const stompClient = stompClientRef.current;
        props.setStompClient(stompClientRef);
        if (stompClient) {
            await stompClient.disconnect();
            await reInitSystem(false);
            await onServerResponse(null);
            dispatch({ type: "disconnected" });
        }
    }

    return (
        <>
            <button
                onClick={handleConnect}
                className={
                    state.connected ? classConnected : classNotConnected
                }
                disabled={state.connected}
            >
                Conectar al Juego
            </button>
            <button
                onClick={handleDisconnect}
                className={
                    state.disconnected ? classDisconnected : classNotDisconnected
                }
                disabled={state.disconnected}
            >
                Desconectar del Juego
            </button>
        </>
    )
}