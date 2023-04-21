import React, { useState } from "react";
import { StatusActions } from "../connect_server/StatusActions";
import { TypePlay } from "../play_bingo/TypePlay";
import { NamePlay } from "../play_bingo/NamePlay";
import { WaitPlay } from "../play_bingo/WaitPlay";
import { StartPlay } from "../play_bingo/StartPlay";
import { ModePlay } from "../play_bingo/ModePlay";

export const Body = (props) => {
    const {
        connected,
        stompClient,
        uuid,
        serverResponse,
        onTypePlayChange,
        typePlayStatus,
        onNamePlayChange,
        namePlayStatus,
        onPrePlayInit,
        tablePlayer,
        modePlayer,
        onServerRefreshTable,
        onStartPlayer,
        startPlayer,
        onInitPlay,
        initPlay
    } = props;

    const handleTypePlay = (typeMode, typeModeStatus) => {
        onTypePlayChange(typeMode, typeModeStatus);
    };

    const handleNamePlay = (namePlay, namePlayStatus) => {
        onNamePlayChange(namePlay, namePlayStatus);
    };

    const handleServerInitPrePlay = (tablePlayer, modePlayer) => {
        onPrePlayInit(tablePlayer, modePlayer);
    }

    const handleServerRefreshTable = (tablePlayer) => {
        onServerRefreshTable(tablePlayer);
    }

    const handleInitPlay = (init) => {
        onInitPlay(init);
    }

    const handleStartPlayer = (start) => {
        onStartPlayer(start);
    }

    return (
        <main className="bg-gradient-to-r from-rose-200 via-lime-50 to-amber-200 pb-6">
            <StatusActions connected={connected} />
            {!initPlay ?
                <div id="pre-init" className="grid grid-cols-2 gap-2">
                    {connected ?
                        <TypePlay
                            connected={connected}
                            bodyStompClient={stompClient}
                            uuid={uuid}
                            serverResponse={serverResponse}
                            onTypePlayChange={handleTypePlay}
                            typePlayStatus={typePlayStatus}
                        />
                        :
                        null
                    }
                    {connected && typePlayStatus ?
                        <NamePlay
                            connected={connected}
                            bodyStompClient={stompClient}
                            uuid={uuid}
                            serverResponse={serverResponse}
                            onNamePlayChange={handleNamePlay}
                            namePlayStatus={namePlayStatus}
                        />
                        :
                        null}
                    {connected && typePlayStatus && namePlayStatus ?
                        <WaitPlay
                            connected={connected}
                            bodyStompClient={stompClient}
                            uuid={uuid}
                            serverResponse={serverResponse}
                            onPrePlayInit={handleServerInitPrePlay}
                            onInitPlay={handleInitPlay}
                        />
                        :
                        null}
                </div>
                :
                <div id="init-play" className="grid grid-cols-1 gap-2">
                    <ModePlay
                        modePlayer={modePlayer}
                    />
                    <StartPlay
                        connected={connected}
                        bodyStompClient={stompClient}
                        uuid={uuid}
                        serverResponse={serverResponse}
                        tablePlayer={tablePlayer}
                        modePlayer={modePlayer}
                        onServerRefreshTable={handleServerRefreshTable}
                        onStartPlayer={handleStartPlayer}
                        startPlayer={startPlayer}
                    />
                </div>
            }
        </main>
    )
}