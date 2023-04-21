import React, { useState, useEffect } from 'react';
import { AceptTable } from "../modals/AceptTable";

const classSend = "rounded-full bg-gradient-to-r from-purple-500 to-rose-500 hover:from-purple-600 hover:to-rose-500 py-2 px-3 font-normal font-sans text-white";
const classNotSend = "rounded-full bg-gradient-to-r from-purple-200 to-rose-200 hover:from-purple-300 hover:to-rose-200 py-2 px-3 font-normal font-sans text-white";
export const StartPlay = (props) => {

    const {
        serverResponse,
        bodyStompClient,
        tablePlayer,
        modePlayer,
        onServerRefreshTable,
        onStartPlayer,
        startPlayer
    } = props;

    const firstRow = ['B', 'I', 'N', 'G', 'O'];

    const handleServerRefreshTable = (tablePlayer) => {
        onServerRefreshTable(tablePlayer);
    }

    const handleStartPlayer = (start) => {
        onStartPlayer(start);
    }

    useEffect(() => {
    }, [bodyStompClient, serverResponse]);

    return (
        <section id="section-play" className="flex justify-center items-center flex-col py-2 px-2">
            {!startPlayer ?
                <AceptTable
                    bodyStompClient={bodyStompClient}
                    serverResponse={serverResponse}
                    onServerRefreshTable={handleServerRefreshTable}
                    modePlayer={modePlayer}
                    onStartPlayer={handleStartPlayer}
                />
                :
                null
            }
            <div className={`rounded-lg px-4 py-4 ring-1 ring-slate-900/5 shadow-xl max-w-md mt-5 w-80 bg-gradient-to-r
                            from-purple-500 from-20% via-cyan-500 via-30% to-emerald-500 to-90%`}>
                <table className="table-fixed w-full">
                    <thead>
                        <tr>
                            {firstRow.map((row, rowIndex) => (
                                <th key={rowIndex} className="w-12 h-12 border border-gray-300 p-2 text-center font-extrabold text-white">
                                    {row}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {tablePlayer.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                {row.map((number, columnIndex) => (
                                    <td key={columnIndex} className="w-12 h-12 border border-gray-300 p-2 text-center text-white">
                                        {number}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}