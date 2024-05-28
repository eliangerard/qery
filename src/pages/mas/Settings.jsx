import { useEffect, useState } from "react"
import { Slide } from "../../ui/Slide"
import { Dropdown } from "../../ui/Dropdown"
import { useNavigate } from "react-router-dom";
import { server } from "../util/server";

export const Settings = () => {

    const navigate = useNavigate();

    const [settings, setSettings] = useState({
        assistant: true,
        language: "Español",
        description: "",
        correctText: true,
        translator: true
    })

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        console.log(settings);
        fetch(`${server}/users/settings`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
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
                setSettings(res);
            })
    }, [])

    const handleSave = () => {
        setLoading(true);
        fetch(`${server}/users/settings`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({ settings })
        })
            .then(res => {
                if (res.status === 401) {
                    navigate("/");
                } else {
                    return res.json();
                }
            })
            .then(res => {
                setLoading(false);
                if (res.error) return console.error(res.error);
                console.log(res);
            })
    }

    return (
        <div className="w-full flex flex-col items-center p-4">
            <h2 className="font-['Prompt'] font-bold text-4xl my-4">Ajustes de +Q</h2>
            <div className="flex w-full">
                <p className="text-2xl font-bold font-['Prompt'] text-white bg-green-500 mr-2 flex items-center p-2 justify-center flex-1">Asistente +Q</p>
                <Slide active={settings.assistant} toggle={(active) => setSettings(prev => ({ ...prev, assistant: active }))} />
            </div>
            <p className="text-center my-2 font-bold text-xl">¿Qué idioma hablas?</p>
            <Dropdown prev={settings.language} onChange={(selected) => {
                console.log(selected);
                setSettings(prev => ({ ...prev, language: selected }))
            }} />
            <p className="text-center my-2 font-bold text-xl">Opciones del asistente</p>
            <textarea name="" id=""
                className="w-full font-['Poppins'] h-32 bg-green-500 text-white placeholder:text-white p-2"
                placeholder="Describe al asistente tu empresa a fondo, el ya conoce la descripción básica de tu empresa y los productos que ofreces."
                value={settings.description}
                onChange={(e) => setSettings(prev => ({ ...prev, description: e.target.value }))}
            >
            </textarea>
            <div className="flex w-full mt-2">
                <div className="bg-accent-500 h-12 flex-1 mr-2 flex items-center justify-center text-xl">
                    Corregir Texto
                </div>
                <Slide active={settings.correctText} toggle={(active) => setSettings(prev => ({ ...prev, correctText: active }))} />
            </div>
            <div className="flex w-full mt-2">
                <div className="bg-accent-500 h-12 flex-1 mr-2 flex items-center justify-center text-xl">
                    Traductor
                </div>
                <Slide active={settings.translator} toggle={(active) => setSettings(prev => ({ ...prev, translator: active }))} />
            </div>
            <button className="w-full bg-green-500 text-white font-semibold p-2 text-xl mt-2 disabled:bg-green-500/75 transition-all"
                onClick={handleSave}
                disabled={loading}
            >Guardar</button>
        </div>
    )
}
