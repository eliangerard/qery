import { useEffect, useRef, useState } from "react"
import { Add } from "../ui/Icons/Add"

export const FAQs = ({ clientSide, showRight, setShowRight }) => {
    const container = useRef(null)

    useEffect(() => {
        function handleClickOutside(event) {
            if (container.current && !container.current.contains(event.target)) {
                setShowRight(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [container, setShowRight]);

    return (

        <div ref={container} className={`absolute xl:static right-0 ${showRight ? "translate-x-0" : "translate-x-[100%] w-0 px-0 w-full"} overflow-hidden xl:translate-x-0 xl:w-1/4 max-w-[28rem] z-50 h-full bg-b-500 transition-all`}>
            <div className="relative px-4 py-8">
                <button className={`left-0 top-0 absolute xl:hidden z-10 h-12 w-12 flex items-center justify-center bg-b-500 text-white font-bold transition-all`}
                    onClick={() => setShowRight(show => !show)}
                >FAQ</button>
                <h2 className="text-5xl font-bold text-white text-center">FAQs</h2>
                {clientSide ? <></> : <div className="flex flex-col justify-center items-center mt-5">
                    <p className="text-xl text-center text-white mb-4">Aún no has añadido preguntas frecuentes.</p>
                    <Add className="w-12" />
                    <p className="text-xl text-center text-white mt-4">Puedes agregar más dudas comunes de tus clientes.</p>
                </div>
                }
            </div>
        </div>
    )
}
