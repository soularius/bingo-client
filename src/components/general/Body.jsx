import React, { useState } from "react";
import { StatusActions } from "../connect_server/StatusActions";
import { TypePlay } from "../play_bingo/TypePlay";
import { NamePlay } from "../play_bingo/NamePlay";
import { WaitPlay } from "../play_bingo/WaitPlay";

export const Body = (props) => {
    const {
        connected,
        stompClient,
        uuid,
        serverResponse,
        onTypePlayChange,
        typePlayStatus,
        onNamePlayChange,
        namePlay,
        namePlayStatus
    } = props;

    const handleTypePlay = (typeMode, typeModeStatus) => {
        onTypePlayChange(typeMode, typeModeStatus);
    };

    const handleNamePlay = (namePlay, namePlayStatus) => {
        onNamePlayChange(namePlay, namePlayStatus);
    };

    return (
        <main className="bg-gradient-to-r from-rose-200 via-lime-50 to-amber-200 pb-6">
            <StatusActions connected={connected} />
            <div className="grid grid-cols-2 gap-2">
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
                    />
                    :
                    null}
            </div>
        </main>
    )
}