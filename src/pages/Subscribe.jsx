import { useContext, useState } from "react";
import UserContext from "../context/UserContext";
import { Header } from "../ui/Header";
import { Mas } from "../ui/Icons/Mas";
import { Union } from "../ui/Icons/Union";
import { server } from "./util/server";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { Success } from "./mas/Success";
import { Home } from "./mas/Home";

export const Subscribe = () => {

    const { user } = useContext(UserContext);
    

    return (
        <div className="relative h-full">
            {user && <Header company={user} />}
            <div className="w-full h-full flex items-center justify-center">
                <div className="flex flex-col items-center justify-center w-full max-w-screen-sm z-20">
                    <Routes>
                        <Route path="/" element={<Home/>} />
                        <Route path="/success" element={<Success/>} />
                        <Route path="/cancel" element={
                            !user ? <Navigate to="/" /> :
                            <>
                                <h2 className="text-7xl font-bold text-center text-ab-500 max-w-screen-sm">No se pudo procesar tu pago</h2>
                                <p className="text-center text-xl py-8">No se realizará ningún cargo a tu cuenta.</p>
                            </>
                        } />
                    </Routes>
                </div>
            </div>
            <img className="fixed left-0 top-0 lg:bottom-0 h-1/2 lg:h-screen min-w-fit -scale-y-100 lg:scale-y-100" src="/back.svg" alt="" />
            <img className="absolute right-0 bottom-0 h-48" src="/qerier.svg" alt="" />
        </div>
    )
}
