import React, { useState } from "react";
import { ServerActions } from "../connect_server/ServerActions"
import { Pictures } from "./Pictures";

export const Header = (props) => {

    const Logo = Pictures.find((Picture) => Picture.Id === "Logo");
    const {
        onConnectChange,
        uuid,
        onServerResponse
    } = props;
    const [stompClient, setStompClient] = useState(null);

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
        onConnectChange({
            newConnected: newConnected,
            newStompClient: newStompClient,
            typeMode: typeMode,
            typeModeStatus: typeModeStatus,
            newNamePlay: newNamePlay,
            newNamePlayStatus: newNamePlayStatus,
            newTablePlayer: newTablePlayer,
            newModePlayer: newModePlayer,
            newStartPlayer: newStartPlayer,
            newInitPlay: newInitPlay
        });
    };

    const handleServerResponse = (messageBody) => {
        onServerResponse(messageBody);
    };

    return (
        <>
            <header className="bg-white">
                <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
                    <div className="flex lg:flex-1">
                        <a href="#" className="-m-1.5 p-1.5">
                            <img className="w-auto logo" src={Logo.SRC} alt={Logo.Alt} />
                        </a>
                    </div>
                    <div className="grid gap-1 grid-cols-2">
                        <ServerActions
                            onConnectChange={handleConnectChange}
                            setStompClient={setStompClient}
                            uuid={uuid}
                            onServerResponse={handleServerResponse}
                        />
                    </div>
                </nav>
            </header>
        </>
    )
}