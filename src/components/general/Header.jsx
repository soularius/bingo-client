import React, { useState } from "react";
import { ServerActions } from "../connect_server/ServerActions"
import { Pictures } from "./Pictures";

export const Header = (props) => {

    const Logo = Pictures.find((Picture) => Picture.Id === "Logo");
    const { onConnectChange } = props;
    const [stompClient, setStompClient] = useState(null);

    const handleConnectChange = (newConnected, newStompClient) => {
        onConnectChange(newConnected, newStompClient);
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
                        <ServerActions onConnectChange={handleConnectChange} setStompClient={setStompClient} />
                    </div>
                </nav>
            </header>
        </>
    )
}