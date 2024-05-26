import { useContext, useEffect } from "react"
import UserContext from "../../context/UserContext";
import { Navigate, useNavigate } from "react-router-dom";
import { server } from "../util/server";

export const Success = () => {

    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    if (!user) navigate("/");

    //Add verification of user subscribed

    return (
        <>
            {
                !user ? <Navigate to="/" /> :
                    <>
                        <h2 className="text-7xl font-bold text-center text-green-500">¡Gracias por apoyar el proyecto!</h2>
                        <p className="text-center text-xl py-8">Las funciones ya están agregadas a tu perfil.</p>
                    </>
            }
        </>
    )
}
