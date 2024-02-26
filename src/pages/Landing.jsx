export const Landing = () => {
    return (
        <div className="bg-w-100 w-full min-h-screen h-fit">

            <header className="fixed top-0 left-0">
                <div className="relative w-fit flex">
                    <div className="w-fit h-fit relative">
                        <h1 className="absolute left-4 md:left-auto md:right-36 translate-y-1/2 bottom-1/2 text-white text-3xl 2xl:text-4xl font-extrabold w-fit">Qery.me</h1>
                        <svg className="h-16 md:h-28 2xl:h-40" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1308 335" fill="none">
                            <path d="M972.425 0L1308 335L1140.54 335L0 335L0 0L972.425 0Z" fill="#0A2540" />
                        </svg>
                    </div>
                    <div className="flex flex-col">
                        <div className="bg-azul-300 flex-grow skew-x-[45deg] origin-bottom">
                        </div>
                        <button className="bg-azul-100 text-xl font-bold w-40 2xl:w-48 h-10 md:h-14 2xl:h-20 ">Login</button>
                    </div>
                </div>
            </header>

            <main className="flex flex-col md:flex-row items-center justify-center items-center min-h-screen h-full w-full md:px-[15%]">
                <div className="w-full md:w-7/12 p-6 md:p-0 pt-28 md:pt-36">
                    <h2 className="text-5xl md:text-6xl 2xl:text-8xl font-bold text-azul-300">Conéctate con tus clientes al instante</h2>
                    <p className="text-2xl 2xl:text-4xl py-6 text-azul-300">Crea tu cuenta ahora mismo</p>
                    <button className="bg-magenta-200 text-lg 2xl:text-xl text-w-100 font-bold w-36 2xl:w-56 h-14 2xl:h-20">Regístrate</button>
                </div>
                <div className="flex w-full md:w-5/12 min-w-fit md:min-h-screen h-full justify-center md:justify-start">
                    <div className="flex flex-col w-fit justify-around items-center">
                        {[...Array(4)].map((_, i) => (
                            <div key={`q${i}`} className={`-scale-x-100 w-fit text-4xl 2xl:text-6xl text-azul-300 ${i != 0 ? 'py-8' : ''}`}>
                                <b>Q</b>
                            </div>
                        ))}
                        <div className="relative w-fit flex items-center justify-center">
                            <svg className="w-48 2xl:w-56" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 471 440" fill="none">
                                <path d="M470.552 219.729C470.552 341.082 367.889 439.458 241.248 439.458H0V355.866H71.6577C26.2745 312.875 11.9429 271.144 11.9429 219.729C11.9429 98.3761 114.606 0 241.248 0C367.889 0 470.552 98.3761 470.552 219.729Z" fill="#0A2540" />
                            </svg>
                            <p className="absolute text-w-100 text-3xl 2xl:text-4xl font-medium">¡Claro!</p>
                        </div>
                        <div className="-scale-x-100 w-fit text-4xl 2xl:text-6xl text-azul-300">
                            <b>Q</b>
                        </div>
                    </div>
                    <div className="flex flex-col w-fit justify-around items-center">
                        {[...Array(3)].map((_, i) => (
                            <div key={`q${i}`} className={`w-fit text-4xl 2xl:text-6xl text-azul-200  ${i != 0 ? 'py-8' : ''}`}>
                                <b>Q</b>
                            </div>
                        ))}
                        <div className="relative w-fit flex items-center justify-center">
                            <svg className="w-48 2xl:w-56" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 471 440" fill="none">
                                <path d="M0.385284 219.729C0.385284 341.082 103.048 439.458 229.69 439.458H470.937V355.866H399.28C444.663 312.875 458.994 271.144 458.994 219.729C458.994 98.3761 356.331 0 229.69 0C103.048 0 0.385284 98.3761 0.385284 219.729Z" fill="#00D4FF" />
                            </svg>
                            <p className="absolute text-w-100 text-3xl 2xl:text-4xl text-center text-azul-300 font-medium">¿Abrirán hoy?</p>
                        </div>
                        {[...Array(2)].map((_, i) => (
                            <div key={`q${i}`} className={`w-fit text-4xl 2xl:text-6xl text-azul-200  ${i != 0 ? 'py-8' : ''}`}>
                                <b>Q</b>
                            </div>
                        ))}
                    </div>
                </div>
            </main>

        </div>
    )
}
