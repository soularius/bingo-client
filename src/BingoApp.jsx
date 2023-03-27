import { useState } from 'react';
import PropTypes from 'prop-types';
import { Header } from './components/general/header';
import { Body } from './components/general/Body';

export const BingoApp = () => {

    const [connected, setConnected] = useState(false);
    const [stompClient, setStompClient] = useState(null);

    const handleConnectChange = (newConnected, newStompClient) => {
        setConnected(newConnected);
        setStompClient(newStompClient);
    };

    return (
        <>
            <Header onConnectChange={handleConnectChange} />
            <Body connected={connected} stompClient={stompClient} />
        </>
    )
}
