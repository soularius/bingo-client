import React, { useState } from "react";
import { StatusActions } from "../connect_server/StatusActions";
import { TypePlay } from "../play_bingo/TypePlay";

export const Body = (props) => {
    const { connected, stompClient } = props;
    const [bodyStompClient, setBodyStompClient] = useState(stompClient);
    return (
        <main className="bg-gradient-to-r from-rose-200 via-lime-50 to-amber-200 pb-6">
            <StatusActions connected={connected} />
            {connected ? <TypePlay connected={connected} bodyStompClient={stompClient} /> : null}
        </main>
    )
}