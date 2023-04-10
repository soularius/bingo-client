import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Header } from './components/general/header';
import { Body } from './components/general/Body';
import { v4 as uuidv4 } from 'uuid';

export const BingoApp = () => {

    const [connected, setConnected] = useState(false);
    const [stompClient, setStompClient] = useState(null);
    const [serverResponse, setServerResponse] = useState(null);
    const [typePlay, setTypePlay] = useState(null);
    const [typePlayStatus, setTypePlayStatus] = useState(null);
    const [namePlay, setNamePlay] = useState(null);
    const [namePlayStatus, setNamePlayStatus] = useState(null);

    const handleConnectChange = (
        newConnected,
        newStompClient,
        typeMode,
        typeModeStatus,
        namePlay,
        namePlayStatus
    ) => {
        setConnected(newConnected);
        setStompClient(newStompClient);
        setTypePlay(typeMode);
        setTypePlayStatus(typeModeStatus);
        setNamePlay(namePlay);
        setNamePlayStatus(namePlayStatus);
    };

    const handleTypePlayChange = (typeMode, typeModeStatus) => {
        setTypePlay(typeMode);
        setTypePlayStatus(typeModeStatus);
    };

    const handleNamePlayChange = (namePlay, namePlayStatus) => {
        setNamePlay(namePlay);
        setNamePlayStatus(namePlayStatus);
    };

    const handleServerResponse = (messageBody) => {
        setServerResponse(messageBody);
    };

    const [uuid] = useState(() => uuidv4());

    return (
        <>
            <Header
                onConnectChange={handleConnectChange}
                uuid={uuid}
                onServerResponse={handleServerResponse}
            />

            <Body
                connected={connected}
                stompClient={stompClient}
                uuid={uuid}
                serverResponse={serverResponse}
                onTypePlayChange={handleTypePlayChange}
                typePlayStatus={typePlayStatus}
                typePlay={typePlay}
                onNamePlayChange={handleNamePlayChange}
                namePlay={namePlay}
                namePlayStatus={namePlayStatus}
            />
        </>
    )
}
