import { useContext, useEffect, useState } from "react";
import UserContext from "../../context/UserContext";
import { Union } from "../../ui/Icons/Union"
import { useNavigate } from "react-router-dom";
import { server } from "../util/server";
import { Settings } from "./Settings";

export const Home = () => {

    const { user } = useContext(UserContext);

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if(!user) return;
        fetch(`${server}/users/subscribed/`, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } })
            .then(res => {
                if (res.status === 401) {
                    navigate("/");
                } else {
                    return res.json();
                }
            })
            .then(res => {
                if (res.error) return console.error(res.error);
                console.log(res);
            })
    }, [])

    const handleCheckout = () => {
        if (!user) return navigate("/");
        if (loading) return;
        setLoading(true);
        fetch(`${server}/users/subscribe`, { method: "POST", headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } })
            .then(res => {
                if (res.status === 401) {
                    //navigate("/");
                } else {
                    return res.json();
                }
            })
            .then(res => {
                setLoading(false);
                if (res.error) return console.error(res.error);
                console.log(res);
                window.location.href = res.session.url;
            })
    }

    return (
        <>
            {
                (user && user.subscribed) ?
                    <>
                        <Settings />
                    </>
                    :
                    <>
                        <h1 className="font-bold text-7xl"><span className="text-green-500">Más</span> Qery</h1>
                        <p className="text-xl my-4 font-medium px-4 text-center">Agrega más funciones a tu cuenta invirtiendo en una suscripción</p>
                        <div className="grid p-8 lg:p-0 lg:grid-cols-2 w-full gap-4">
                            <div>
                                <div className="bg-ab-500 text-white text-4xl font-bold px-4 py-2">Qery</div>
                                <ul className="list-disc list-inside px-4 font-['Poppins']">
                                    <li className="px-4 my-2 bg-accent-500 text-lg">Chats con clientes</li>
                                    <li className="px-4 my-2 bg-accent-500 text-lg">Chats con empresas</li>
                                    <li className="px-4 my-2 bg-accent-500 text-lg">Preguntas frecuentes</li>
                                    <li className="px-4 my-2 bg-accent-500 text-lg">Información de contacto</li>
                                </ul>
                            </div>
                            <div>
                                <div className="bg-green-500 text-white text-4xl font-bold px-4 py-2 flex items-center">
                                    <img className="h-8 mr-3" src="/union.svg" alt="" />
                                    Qery
                                </div>
                                <ul className="list-disc list-inside px-4 font-['Poppins']">
                                    <li className="px-4 my-2 bg-accent-500 text-lg">Todo lo anterior</li>
                                    <li className="px-4 my-2 bg-b-500 text-white list-none flex items-center font-semibold text-lg"><img className="h-4 pr-3 -ml-1" src="/union.svg" alt="" />Asistente en chat</li>
                                    <li className="px-4 my-2 bg-b-500 text-white list-none flex items-center font-semibold text-lg"><img className="h-4 pr-3 -ml-1" src="/union.svg" alt="" />API para tu sitio</li>
                                    <li className="px-4 my-2 bg-b-500 text-white list-none flex items-center font-semibold text-lg"><img className="h-4 pr-3 -ml-1" src="/union.svg" alt="" />Pedidos pre-pago</li>
                                </ul>
                            </div>
                        </div>
                        <div className="w-full flex justify-end py-8 px-4">
                            <div className="flex items-center rotate-[-5deg] justify-end lg:-mr-12 group hover:translate-y-3 transition-all w-fit">
                                <Union className="h-8 fill-accent-500" />
                                <button className="bg-green-500 mx-4 text-white font-semibold px-4 py-2 group-hover:bg-black text-2xl md:w-96 transition-all"
                                    disabled={loading}
                                    onClick={handleCheckout}
                                >Suscríbete por $129 mensuales</button>
                                <Union className="h-8 fill-accent-500" />
                            </div>
                        </div>
                    </>
            }
        </>
    )
}
