import React, { Fragment, useRef, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react'
import { BellIcon } from '@heroicons/react/24/outline'

const classSend = "rounded-full bg-gradient-to-r from-purple-500 to-rose-500 hover:from-purple-600 hover:to-rose-500 py-2 px-3 font-normal font-sans text-white";
const classNotSend = "rounded-full bg-gradient-to-r from-purple-200 to-rose-200 hover:from-purple-300 hover:to-rose-200 py-2 px-3 font-normal font-sans text-white";
const classBg = " bg-gradient-to-t from-yellow-300 to-rose-300 font-normal font-sans text-white";
export const StartPlayLoad = (props) => {

    const {
        serverResponse,
        bodyStompClient,
        onWaitPlayer
    } = props;

    const [displayText, setDisplayText] = useState("Esperando la aceptación de los otros jugadores");
    const [counter, setCounter] = useState(null);
    const [valSleep, setValSleep] = useState(3);
    const [messageSent, setMessageSent] = useState(false);
    const [open, setOpen] = useState(true)

    useEffect(() => {
        if (serverResponse && serverResponse.type === 'play_go') {
            onWaitPlayer(false, true);
            console.log('[SERVER RESPONSE TYPE PLAY] Receive message:', serverResponse.status);
        }
    }, [bodyStompClient, serverResponse]);

    useEffect(() => {
        if (counter === null) return;

        if (counter === valSleep) setDisplayText("Let`s Go");
        if (counter > 0) {
            const timer = setTimeout(() => {
                setCounter(counter - 1);
            }, 1000);
            return () => clearTimeout(timer);
        } else {
            setCounter(null);
            // Aquí puedes agregar lógica adicional cuando el contador llegue a 0
        }
    }, [counter]);

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={setOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                    <div className="sm:flex sm:items-start">
                                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                            <div className="mb-3 flex items-center justify-center">
                                                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                                    <BellIcon className="h-6 w-6 text-rose-700" aria-hidden="true" />
                                                </div>
                                                <Dialog.Title as="strong" className="ml-3 font-sans font-extrabold text-rose-900 text-lg text-transparent bg-clip-text bg-gradient-to-r from-rose-600  to-lime-500 via-amber-600">
                                                    {displayText}
                                                </Dialog.Title>
                                            </div>
                                            <div className="mt-2 w-full flex justify-center relative items-center">
                                                <div className=" w-max flex justify-center relative items-center">
                                                    <svg className="animate-spin h-10 w-10" viewBox="0 0 24 24">
                                                        <defs>
                                                            <linearGradient id="gradientFill" x1="0%" y1="0%" x2="100%" y2="0%">
                                                                <stop offset="0%" style={{ stopColor: "#a855f7" }} />
                                                                <stop offset="100%" style={{ stopColor: "#d97706" }} />
                                                            </linearGradient>
                                                        </defs>
                                                        <circle className="fill-rose-200" cx="12" cy="12" r="10" strokeWidth="5"></circle>
                                                        <path className="" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" fill="url(#gradientFill)"></path>
                                                    </svg>
                                                    {counter !== null && (
                                                        <div id="counter-play" className="flex justify-center absolute">
                                                            <strong className="font-sans font-extrabold text-rose-900 text-xl text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-amber-800">
                                                                {counter}
                                                            </strong>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
}