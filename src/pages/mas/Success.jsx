import { useContext, useEffect } from "react"
import UserContext from "../../context/UserContext";
import { Navigate, useNavigate } from "react-router-dom";
import { server } from "../util/server";

export const Success = () => {

    const { user } = useContext(UserContext);

    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    console.log(code);

    return (
        <>
            {
                code ?
                <>
                    <h2 className="text-7xl font-bold text-center text-green-500">{code}</h2>
                    <p className="text-center text-xl py-8">¡Anota este código para recoger tu pedido!</p>
                </> :
                !user ? <Navigate to="/" /> :
                    <>
                        <h2 className="text-7xl font-bold text-center text-green-500">¡Gracias por apoyar el proyecto!</h2>
                        <p className="text-center text-xl py-8">Las funciones ya están agregadas a tu perfil.</p>
                    </>
            }
        </>
    )
}
