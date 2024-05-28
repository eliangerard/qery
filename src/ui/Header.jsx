import { useContext, useState } from "react";
import { Share } from "./Icons/Share";
import { Link, useLocation } from "react-router-dom";
import { Logo } from "./Icons/Logo";
import UserContext from "../context/UserContext";
import { Mas } from "./Icons/Mas";

export const Header = ({ company, showLeft, setShowLeft, showRight, setShowRight }) => {

    const { user } = useContext(UserContext);
    console.log(company);

    const { pathname } = useLocation();
    console.log(pathname, pathname.includes('company'));

    const [showCopied, setShowCopied] = useState(false);

    return (
        <div className="flex absolute top-0 left-0 w-full justify-between z-10">
            <div className="flex relative">
                <button className={`flex relative z-30 lg:hidden items-center justify-center pt-0.5 px-2 h-12 text-xl bg-accent-500 font-bold text-accent-500 transition-all`}
                    onClick={() => setShowLeft(show => !show)}
                >
                    <div className="rounded-full flex items-center justify-center bg-black text-sm h-6 w-6">i</div>
                    <p className="hidden sm:block text-black px-4">{company?.companyName}</p>
                </button>
                <Link to={`${pathname.includes('company') ? '/company' : ''}/${company._id}/products`} className="bg-green-500 w-12 flex items-center justify-center">
                    <img className="w-5" src="/store.svg" alt="" />
                </Link>
                <div className="relative flex h-12">
                    <button className="relative bg-ab-500 w-12 h-12 flex items-center justify-center pr-1 pt-1 rounded-r-full hover:translate-x-[0.5rem] active:translate-x-[0.2rem] transition-all duration-75 z-10"
                        onClick={() => {
                            const company = encodeURI(user ? user?._id : company?._id)
                            const link = "https://qery.me/company/" + company;
                            navigator.clipboard.writeText(link);
                            setShowCopied(true);
                            setTimeout(() => setShowCopied(false), 2000);
                        }}
                    >
                        <div className={`${showCopied ? "opacity-100 max-h-8 p-2" : "opacity-0 max-h-0"} absolute bg-white w-40 overflow-hidden right-[-100%] translate-x-[75%] top-1/2 translate-y-[-50%] rounded-full transition-all`}>
                            <p className="font-semibold text-sm">¡Enlace copiado!</p>
                        </div>
                        <Share className="w-4" />
                    </button>
                    <div className="absolute w-4 bg-ab-500 h-12 left-0 top-0"></div>
                </div>
            </div>
            <div className="flex">
                <Link to={`${pathname.includes('company') ? `/company/${company._id}` : ''}/`}>
                    <Logo className="h-12" />
                </Link>
                <Link to="/mas">
                    <Mas className="h-12 fill-green-500" />
                </Link>
                <button className={`${showRight ? "right-[28rem]" : "right-0"} xl:hidden z-10 h-12 w-12 flex items-center justify-center bg-b-500 text-white font-bold transition-all`}
                    onClick={() => setShowRight(show => !show)}
                >FAQ</button>
            </div>
        </div>
    )
}
