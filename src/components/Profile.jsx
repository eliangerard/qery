import { useContext, useEffect, useRef, useState } from "react";
import { Edit } from "../ui/Icons/Edit";
import UserContext from "../context/UserContext";

export const Profile = ({ company, showLeft, setShowLeft }) => {

    const { user } = useContext(UserContext);
    const [edit, setEdit] = useState(false);
    const [editableUser, setEditableUser] = useState(user);
    const container = useRef(null);

    useEffect(() => setEditableUser(user), [user]);

    useEffect(() => {
        function handleClickOutside(event) {
            if (container.current && !container.current.contains(event.target)) {
                setShowLeft(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [container, setShowLeft]);

    return (
        <div ref={container} className={`absolute lg:static w-full lg:w-[50vh] max-w-[28rem] min-w-16 overflow-hidden h-full bg-accent-500 left-0 ${showLeft ? "translate-x-0" : "translate-x-[-100%]"} lg:translate-x-0 z-50 transition-all`}>
            <div className="flex items-center justify-between h-12">
                <p className="text-lg px-2 font-semibold">Información de la empresa</p>
                <button className={`flex relative z-30 lg:hidden items-center justify-center pt-0.5 w-12 h-12 text-xl bg-accent-500 font-bold text-accent-500 transition-all`}
                    onClick={() => setShowLeft(show => !show)}
                >
                    <div className="rounded-full flex items-center justify-center bg-black text-sm h-6 w-6">i</div>
                </button>
            </div>
            <img className="w-full h-1/2 object-cover" src={company ? company?.picture?.substring(0, company?.picture?.indexOf("=")) : user?.picture?.substring(0, user?.picture?.indexOf("="))} alt="" />
            <div className="relative p-2">
                {!company &&
                    <button onClick={() => setEdit(edit => !edit)} className="absolute bg-b-500 top-0 right-0 h-16 w-16 flex items-start justify-end p-3 rounded-bl-full">
                        <Edit className="w-8" />
                    </button>
                }
                <input className={`${edit ? "border-b-2" : ""} outline-transparent focus:outline-none border-black bg-transparent transition-all duration-75 font-sans text-4xl 2xl:text-6xl font-bold my-4 w-full`}
                    value={company ? company?.companyName : edit ? editableUser.companyName : user?.companyName ? user?.companyName : "Sin nombre"}
                    onChange={(e) => setEditableUser({ ...editableUser, companyName: e.target.value })}
                    disabled={!edit}
                />
                <input className={`${edit ? "border-b-2" : ""} outline-transparent focus:outline-none border-black bg-transparent transition-all duration-75 text-lg 2x:text-2xl mb-2 w-full`}
                    value={company ? company?.phone ? company.phone : "Sin teléfono" : edit ? editableUser.phone : user?.phone ? user?.phone : "Sin teléfono"}
                    onChange={(e) => setEditableUser({ ...editableUser, phone: e.target.value })}
                    disabled={!edit}
                />
                <input className={`${edit ? "border-b-2" : ""} outline-transparent focus:outline-none border-black bg-transparent transition-all duration-75 text-lg 2x:text-2xl mb-2 w-full`}
                    value={edit && editableUser?.schedule?.length > 0 ? "Horario" : user?.schedule?.length > 0 ? user?.schedule : "Sin horario"}
                    onChange={(e) => setEditableUser({ ...editableUser, schedule: e.target.value })}
                    disabled={!edit}
                />
            </div>
            {!company &&
                <button className="bg-ab-500 text-white px-4 py-2 font-bold absolute bottom-8 left-8"
                    onClick={() => {
                        localStorage.removeItem('token');
                        window.location.reload();
                    }}
                >Cerrar sesión</button>
            }
        </div>
    )
}
