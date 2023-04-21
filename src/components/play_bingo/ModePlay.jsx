import React, { useState, useEffect } from 'react';

const classSend = "rounded-full bg-gradient-to-r from-purple-500 to-rose-500 hover:from-purple-600 hover:to-rose-500 py-2 px-3 font-normal font-sans text-white";
const classNotSend = "rounded-full bg-gradient-to-r from-purple-200 to-rose-200 hover:from-purple-300 hover:to-rose-200 py-2 px-3 font-normal font-sans text-white";
export const ModePlay = (props) => {

    const {
        modePlayer
    } = props;

    return (
        <section id="mode-play" className="flex justify-center col-span-2 mt-5">
            <span
                className={`first-line:flex-none rounded-full py-1 px-3.5 text-sm font-semibold text-white shadow-sm 
                        focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 
                        focus-visible:outline-gray-900 
                        bg-gradient-to-r from-teal-600 to-violet-500 cursor-not-allowed`}
            >
                Modo de Juego: <span className={`font-bold`}>{modePlayer}</span> <span aria-hidden="true">&#x1F31F;</span>
            </span>
        </section>
    );
}