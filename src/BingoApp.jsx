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
    const [typePlayStatus, setTypePlayStatus] = useState(false);
    const [namePlay, setNamePlay] = useState(null);
    const [namePlayStatus, setNamePlayStatus] = useState(false);
    const [tablePlayer, setTablePlayer] = useState([]);
    const [modePlayer, setModePlayer] = useState(null);
    const [startPlayer, setStartPlayer] = useState(false);
    const [initPlay, setInitPlay] = useState(false);

    const handleConnectChange = ({
        newConnected,
        newStompClient,
        typeMode,
        typeModeStatus,
        newNamePlay,
        newNamePlayStatus,
        newTablePlayer,
        newModePlayer,
        newStartPlayer,
        newInitPlay
    }) => {
        setConnected(newConnected);
        setStompClient(newStompClient);
        setTypePlay(typeMode);
        setTypePlayStatus(typeModeStatus);
        setNamePlay(newNamePlay);
        setNamePlayStatus(newNamePlayStatus);
        setTablePlayer(newTablePlayer);
        setModePlayer(newModePlayer);
        setStartPlayer(newStartPlayer);
        setInitPlay(newInitPlay);
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

    const handleServerInitPrePlay = (tablePlayer, modePlayer) => {
        setTablePlayer(tablePlayer);
        setModePlayer(modePlayer);
    }

    const handleServerRefreshTable = (tablePlayer) => {
        setTablePlayer(tablePlayer);
    }

    const handleStartPlayer = (start) => {
        setStartPlayer(start);
    }

    const handleInitPlay = (initPlay) => {
        setInitPlay(initPlay);
    }

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
                onPrePlayInit={handleServerInitPrePlay}
                tablePlayer={tablePlayer}
                modePlayer={modePlayer}
                onServerRefreshTable={handleServerRefreshTable}
                onStartPlayer={handleStartPlayer}
                startPlayer={startPlayer}
                onInitPlay={handleInitPlay}
                initPlay={initPlay}
            />
        </>
    )
}
