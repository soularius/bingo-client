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

    const { onConnectChange } = props;
    const [state, dispatch] = useReducer(reducer, initialState);
    const stompClientRef = useRef(null);

    const handleConnect = async () => {
        const socket = new SockJS(import.meta.env.VITE_SOCK_JS_SERVER);
        const stompClient = Stomp.over(socket);
        await stompClient.connect({}, (frame) => {
            dispatch({ type: "connected" });
            onConnectChange(true, stompClientRef);
            console.log("Connected: " + frame);
            /* stompClient.subscribe("/topic/greetings", (greeting) => {
                console.log("[RECEIVE]", greeting.body);
                self.setState({
                    name: greeting.body
                });
            }); */
        });
        stompClientRef.current = stompClient;
        props.setStompClient(stompClientRef);
    }

    const handleDisconnect = async () => {
        const stompClient = stompClientRef.current;
        props.setStompClient(stompClientRef);
        if (stompClient) {
            await stompClient.disconnect();
            dispatch({ type: "disconnected" });
            onConnectChange(false, stompClientRef);
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