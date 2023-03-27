import React from 'react';
export const StatusActions = (props) => {
    const { connected } = props;
    return (
        <section>
            <div className="relative isolate flex items-center justify-center gap-x-6 overflow-hidden bg-gray-50 py-2.5 px-6 sm:px-3.5">
                <div className="flex flex-wrap items-center justify-center gap-y-2 gap-x-4">
                    <p className="text-sm leading-6 text-gray-900 font-normal font-sans">
                        <strong className="font-semibold">
                            <span aria-hidden="true" className='text-amber-400'> &#9755;</span>&nbsp;
                            Juego del Bingo&nbsp;
                            <span aria-hidden="true" className='text-amber-400'> &#9754;</span>&nbsp;
                        </strong>
                        <svg viewBox="0 0 2 2" className="mx-2 inline h-0.5 w-0.5 fill-current" aria-hidden="true">
                            <circle cx={1} cy={1} r={1} />
                        </svg>
                        Estado de la conexión
                    </p>
                    <span
                        href="#"
                        className={`first-line:flex-none rounded-full py-1 px-3.5 text-sm font-semibold text-white shadow-sm 
                        focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 
                        focus-visible:outline-gray-900 ${connected ?
                                "bg-gradient-to-r from-pink-500 to-yellow-500 cursor-pointer" :
                                "bg-gradient-to-r from-lime-600 to-yellow-500 cursor-not-allowed"}`}
                    >
                        {connected ?
                            <span>Conectado  <span aria-hidden="true"> &#9728;</span></span> :
                            <span>Desconectado  <span aria-hidden="true"> &#9731;</span></span>
                        }
                    </span>
                </div>
            </div>
        </section>
    )
}