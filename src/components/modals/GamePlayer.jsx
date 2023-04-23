import React, { Fragment, useRef, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react'
import { BellIcon } from '@heroicons/react/24/outline'

const classSend = "rounded-full bg-gradient-to-r from-purple-500 to-rose-500 hover:from-purple-600 hover:to-rose-500 py-2 px-3 font-normal font-sans text-white";
const classNotSend = "rounded-full bg-gradient-to-r from-purple-200 to-rose-200 hover:from-purple-300 hover:to-rose-200 py-2 px-3 font-normal font-sans text-white";
const classBg = " bg-gradient-to-t from-yellow-300 to-rose-300 font-normal font-sans text-white";
export const GamePlayer = (props) => {

    const [open, setOpen] = useState(true)
    const {
        playerGame
    } = props;

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
                                    <div className="sm:flex sm:items-start w-full">
                                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                                            <div className="flex items-center justify-start w-full">
                                                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                                    <BellIcon className="h-6 w-6 text-rose-700" aria-hidden="true" />
                                                </div>
                                                <Dialog.Title as="strong" className="ml-3 font-sans font-extrabold text-rose-900 text-lg text-transparent bg-clip-text bg-gradient-to-r from-rose-600  to-lime-500 via-amber-600">
                                                    BINGO GANADO POR: <span className='uppercase'>{playerGame}</span>
                                                </Dialog.Title>
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