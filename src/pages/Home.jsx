import { useContext, useEffect, useState } from "react"
import { Edit } from "../ui/Icons/Edit";
import { Logo } from "../ui/Icons/Logo";
import { Link } from "react-router-dom";
import UserContext from "../context/UserContext";
import { Add } from "../ui/Icons/Add";
import { Share } from "../ui/Icons/Share";
import { server } from "./util/server";

export const Home = () => {

    const { user } = useContext(UserContext);

    const [edit, setEdit] = useState(false);
    const [editableUser, setEditableUser] = useState(user);

    const [showCopied, setShowCopied] = useState(false);

    useEffect(() => setEditableUser(user), [user]);

    return (
        <div className="grid grid-cols-4 w-full h-full">
            <div className="w-full h-full bg-accent-500">
                <img className="w-full h-1/2 object-cover" src={user?.picture?.substring(0, user?.picture?.indexOf("="))} alt="" />
                <div className="relative p-4 px-8">
                    <button onClick={() => setEdit(edit => !edit)} className="absolute bg-b-500 top-0 right-0 h-16 w-16 flex items-start justify-end p-3 rounded-bl-full">
                        <Edit className="w-8" />
                    </button>
                    <input className={`${edit ? "border-b-2" : ""} outline-transparent focus:outline-none border-black bg-transparent transition-all duration-75 font-sans text-4xl 2xl:text-6xl font-bold my-4 w-full`}
                        value={edit ? editableUser.companyName : user?.companyName ? user?.companyName : "Sin nombre"}
                        onChange={(e) => setEditableUser({ ...editableUser, companyName: e.target.value })}
                        disabled={!edit}
                    />
                    <input className={`${edit ? "border-b-2" : ""} outline-transparent focus:outline-none border-black bg-transparent transition-all duration-75 text-lg 2x:text-2xl mb-2 w-full`}
                        value={edit ? editableUser.phone : user?.phone ? user?.phone : "Sin teléfono"}
                        onChange={(e) => setEditableUser({ ...editableUser, phone: e.target.value })}
                        disabled={!edit}
                    />
                    <input className={`${edit ? "border-b-2" : ""} outline-transparent focus:outline-none border-black bg-transparent transition-all duration-75 text-lg 2x:text-2xl mb-2 w-full`}
                        value={edit && editableUser?.schedule?.length > 0 ? "Horario" : user?.schedule?.length > 0 ? user?.schedule : "Sin horario"}
                        onChange={(e) => setEditableUser({ ...editableUser, schedule: e.target.value })}
                        disabled={!edit}
                    />
                </div>
                <button className="bg-ab-500 text-white px-4 py-2 font-bold absolute bottom-8 left-8"
                    onClick={() => {
                        localStorage.removeItem('token');
                        window.location.reload();
                    }}
                >Cerrar sesión</button>
            </div>
            <div className="relative w-full h-full col-span-2 bg-w-500 px-12 py-8">
                <Link to="/home">
                    <Logo className="absolute h-16 top-0 right-0" />
                </Link>
                <h2 className="text-5xl font-bold">Preguntas comunes</h2>
                <div className="flex flex-col justify-center items-center my-10">
                    <p className="text-xl mb-4">Aún no has añadido preguntas frecuentes.</p>
                    <Add className="w-12" />
                    <p className="text-xl mt-4">Puedes agregar más dudas comunes de tus clientes.</p>
                </div>
                <div className="absolute flex items-end h-24 bottom-0 left-12">
                    <button className="relative bg-ab-500 w-16 flex items-center justify-center pr-1 pt-2 rounded-t-full h-[4.5rem] hover:translate-y-[-0.5rem] active:translate-y-[-1rem] transition-all duration-75 z-10"
                        onClick={() => {
                            const company = encodeURI(user?.companyName.toLowerCase())
                            const link = server + "user/" + company;
                            navigator.clipboard.writeText(link);
                            setShowCopied(true);
                            setTimeout(() => setShowCopied(false), 2000);
                        }}
                    >
                        <div className={`${showCopied ? "opacity-100 max-h-8 p-2" : "opacity-0 max-h-0"} absolute bg-white w-40 overflow-hidden top-[-3rem] left-1/2 translate-x-[-50%] rounded-full transition-all`}>
                            <p className="font-semibold text-sm">¡Enlace copiado!</p>
                        </div>
                        <Share className="w-8" />
                    </button>
                    <div className="absolute h-8 bg-ab-500 w-full bottom-0 left-0"></div>
                </div>
            </div>
            <div className="w-full h-full bg-b-500 py-8 px-4">
                <h2 className="text-5xl font-bold text-white text-center">Inbox</h2>
                <p className="text-center text-xl text-white my-4 italic">Sin preguntas pendientes, ¡Bien hecho!</p>
            </div>
        </div>
    )
}
