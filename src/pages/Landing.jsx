import { Link, useNavigate } from "react-router-dom"
import { Aside } from "../ui/Icons/Aside"
import { Messages } from "../ui/Icons/Messages"
import { GuyL } from "../ui/Icons/GuyL"
import { GuyR } from "../ui/Icons/GuyR"
import { useGoogleLogin } from "@react-oauth/google"

export const Landing = () => {

    const navigate = useNavigate();

    const login = useGoogleLogin({
        onSuccess: async tokenResponse => {
            localStorage.setItem('token', tokenResponse.access_token);
            navigate('/home');
        }
    });

    return (
        <div className="flex relative items-center h-full overflow-hidden">
            <Aside className="min-h-screen h-screen px-4" />
            <div className="relative z-10">
                <h1 className="text-8xl 2xl:text-[10rem] font-bold left-[-5.8rem] 2xl:left-[-9rem] relative">Qery.me</h1>
                <div className="w-96 2xl:w-[32rem]">
                    <p className="text-2xl 2xl:text-4xl my-3 2xl:my-8 ">Conéctate con tus clientes al instante</p>
                    <button className="flex items-center justify-center bg-ab-500 text-white w-fit text-center font-bold p-4 px-12 text-xl 2xl:text-2xl"
                        onClick={login}
                    >
                        <svg className="h-7 mr-4" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg">

                            <title>google [#178]</title>
                            <desc>Created with Sketch.</desc>
                            <defs>

                            </defs>
                            <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                <g id="Dribbble-Light-Preview" transform="translate(-300.000000, -7399.000000)" fill="#FFFFFF">
                                    <g id="icons" transform="translate(56.000000, 160.000000)">
                                        <path d="M263.821537,7247.00386 L254.211298,7247.00386 C254.211298,7248.0033 254.211298,7250.00218 254.205172,7251.00161 L259.774046,7251.00161 C259.560644,7252.00105 258.804036,7253.40026 257.734984,7254.10487 C257.733963,7254.10387 257.732942,7254.11086 257.7309,7254.10986 C256.309581,7255.04834 254.43389,7255.26122 253.041161,7254.98137 C250.85813,7254.54762 249.130492,7252.96451 248.429023,7250.95364 C248.433107,7250.95064 248.43617,7250.92266 248.439233,7250.92066 C248.000176,7249.67336 248.000176,7248.0033 248.439233,7247.00386 L248.438212,7247.00386 C249.003881,7245.1669 250.783592,7243.49084 252.969687,7243.0321 C254.727956,7242.65931 256.71188,7243.06308 258.170978,7244.42831 C258.36498,7244.23842 260.856372,7241.80579 261.043226,7241.6079 C256.0584,7237.09344 248.076756,7238.68155 245.090149,7244.51127 L245.089128,7244.51127 C245.089128,7244.51127 245.090149,7244.51127 245.084023,7244.52226 L245.084023,7244.52226 C243.606545,7247.38565 243.667809,7250.75975 245.094233,7253.48622 C245.090149,7253.48921 245.087086,7253.49121 245.084023,7253.49421 C246.376687,7256.0028 248.729215,7257.92672 251.563684,7258.6593 C254.574796,7259.44886 258.406843,7258.90916 260.973794,7256.58747 C260.974815,7256.58847 260.975836,7256.58947 260.976857,7256.59047 C263.15172,7254.63157 264.505648,7251.29445 263.821537,7247.00386" id="google-[#178]">

                                        </path>
                                    </g>
                                </g>
                            </g>
                        </svg>
                        <p className="mr-4">Inicia con Google</p>
                    </button>
                </div>
            </div >
            <div className="absolute left-2/4 flex h-full w-2/5 flex-col justify-end">
                <Messages className="flex-1 w-full pt-8" />
                <div className="flex w-full justify-between items-end">
                    <GuyL className="w-80" />
                    <GuyR className="w-80" />
                </div>
            </div>
        </div >
    )
}
