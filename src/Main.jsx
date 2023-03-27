import React from 'react';
import ReactDOM from 'react-dom/client';
import { BingoApp } from './BingoApp';

import './assets/css/tailwind.css'
import './assets/css/style.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BingoApp />
    </React.StrictMode>
);