import { useContext, useEffect, useRef, useState } from "react";
import { Edit } from "../ui/Icons/Edit";
import UserContext from "../context/UserContext";
import { server } from "../pages/util/server";

export const Profile = ({ company, showLeft, setShowLeft }) => {

    const { user, setUser } = useContext(UserContext);
    const [edit, setEdit] = useState(false);
    const [editableUser, setEditableUser] = useState(user);
    const container = useRef(null);
    const imageInput = useRef(null);

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
        <div ref={container} className={`absolute lg:static w-full lg:w-[50vh] max-w-[50vh] min-w-16 overflow-hidden h-full bg-accent-500 left-0 ${showLeft ? "translate-x-0" : "translate-x-[-100%]"} lg:translate-x-0 z-50 transition-all`}>
            <div className="flex items-center justify-between h-12">
                <p className="text-lg px-2 font-semibold">Información de la empresa</p>
                <button className={`flex relative z-30 lg:hidden items-center justify-center pt-0.5 w-12 h-12 text-xl bg-accent-500 font-bold text-accent-500 transition-all`}
                    onClick={() => setShowLeft(show => !show)}
                >
                    <div className="rounded-full flex items-center justify-center bg-black text-sm h-6 w-6">i</div>
                </button>
            </div>
            <img className="w-full h-1/2 object-cover" src={company ? company.picture : editableUser.picture.startsWith('http') ? editableUser.picture?.substring(0, editableUser?.picture?.indexOf("=")) : editableUser.picture} alt=""
                onClick={() => {
                    if (!edit) return;
                    imageInput.current.click()
                }}
            />
            <input ref={imageInput} type="file" accept="image/*" className="hidden"
                onChange={(e) => {
                    const file = e.target.files[0];
                    const reader = new FileReader();
                    reader.onloadend = () => {
                        setEditableUser({ ...editableUser, picture: reader.result });
                    }
                    reader.readAsDataURL(file);
                }}
            />
            <div className="relative p-2">
                {!company &&
                    <button onClick={() => {
                        if (edit) {
                            fetch(`${server}/users/`, {
                                method: "PATCH",
                                headers: {
                                    'Content-Type': 'application/json',
                                    Authorization: `Bearer ${localStorage.getItem('token')}`
                                },
                                body: JSON.stringify(editableUser)
                            }).then(res => res.json()).then(res => {
                                if (res.error) return console.error(res.error);
                                console.log(res);
                                setUser({
                                    ...user,
                                    ...res
                                })
                            })
                        }
                        setEdit(edit => !edit)
                    }} className="absolute bg-b-500 top-0 right-0 h-16 w-16 flex items-start justify-end p-3 rounded-bl-full">
                        <Edit className="w-8" />
                    </button>
                }
                {edit ? <input className={`${edit ? "border-b-2" : ""} outline-transparent focus:outline-none border-black bg-transparent transition-all duration-75 font-sans text-4xl 2xl:text-6xl font-bold my-4 w-full break-words text-wrap`}
                    value={company ? company?.companyName : edit ? editableUser.companyName : user?.companyName ? user?.companyName : "Sin nombre"}
                    onChange={(e) => setEditableUser({ ...editableUser, companyName: e.target.value })}
                    disabled={!edit}
                />
                    :
                    <p className="text-4xl 2xl:text-6xl font-bold my-4 w-full break-words text-wrap">{company ? company.companyName : editableUser?.companyName}</p>
                }
                <div className="flex items-center">
                    <img className="w-6" src="/phone.png" alt="" />
                    {edit ? <input className={`${edit ? "border-b-2" : ""} h-full outline-transparent focus:outline-none border-black bg-transparent transition-all duration-75 text-2xl ml-2 w-full`}
                        value={company ? company?.phone ? company.phone : "Sin teléfono" : edit ? editableUser.phone : user?.phone ? user?.phone : "Sin teléfono"}
                        onChange={(e) => setEditableUser({ ...editableUser, phone: e.target.value })}
                        disabled={!edit}
                    />
                        :
                        <a href={`tel:${company ? company.phone : editableUser?.phone ? editableUser.phone : user?.phone}`}
                            className="text-2xl ml-2 w-full"
                        >{company ? company.phone : editableUser?.phone ? editableUser.phone : user?.phone}</a>
                    }
                </div>
                <div className="flex mt-2 font-medium">
                    <div className="rounded-full flex items-end justify-center bg-black text-accent-500 text-sm h-6 w-6 mr-2.5">i</div>
                    {edit ? <input className={`${edit ? "border-b-2" : ""} outline-transparent focus:outline-none border-black bg-transparent transition-all duration-75 text-lg 2x:text-2xl mb-2 w-full`}
                        value={company ? company.description : editableUser?.description?.length > 0 ? editableUser?.description : "Sin descripción"}
                        onChange={(e) => setEditableUser({ ...editableUser, description: e.target.value })}
                        disabled={!edit}
                    />
                        :
                        <p className="text-lg 2x:text-2xl mb-2 mb-2 w-full break-words text-wrap">{company ? company.description : editableUser?.description?.length > 0 ? editableUser?.description : "Sin descripción"}</p>
                    }
                </div>
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
