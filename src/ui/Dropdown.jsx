import { useEffect, useState } from "react";

const languages = [
    "Español",
    "Inglés",
    "Francés",
    "Alemán",
    "Italiano",
    "Portugués",
    "Ruso",
    "Chino",
    "Japonés",
    "Coreano",
    "Árabe"
];

export const Dropdown = ({ onChange = () => { } }) => {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState(languages[0]);

    useEffect(() => {
        onChange(selected);
    }, [selected])

    return (
        <div className="relative w-full select-none">
            <div className="relative z-20 bg-accent-500 h-12 w-full flex items-center justify-center text-xl"
                onClick={() => setOpen((prev) => !prev)}
            >
                {selected}
            </div>
            {open && <div className="absolute w-full top-full z-10 h-[120px] overflow-y-scroll">
                {languages.map((language, index) => (
                    <div key={`language${index}`} className="bg-accent-500 h-12 w-full flex items-center justify-center text-xl"
                        onClick={() => {
                            setSelected(language);
                            setOpen(false);
                        }}
                    >
                        {language}
                    </div>
                ))
                }
            </div>}
        </div>
    )
}
