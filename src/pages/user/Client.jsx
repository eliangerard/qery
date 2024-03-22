import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { server } from "../util/server";
import { Share } from "../../ui/Icons/Share";
import { Logo } from "../../ui/Icons/Logo";
import { Add } from "../../ui/Icons/Add";

export const Client = () => {

    const { username } = useParams();
    const [user, setUser] = useState(null);
    const [showCopied, setShowCopied] = useState(false);

    const [newQuestion, setNewQuestion] = useState("");

    const [questions, setQuestions] = useState([]);
    const [commonQuestions, setCommonQuestions] = useState([]);

    useEffect(() => {
        const loadUser = async () => {
            const user = await fetch(`${server}users/${encodeURI(username)}`).then(res => res.json()).then(res => res);
            setUser(user);
        }
        loadUser();
    }, [username])

    return (
        <div className="w-full h-full">
            <div className="grid grid-cols-4 h-full w-full">
                <div className="w-full h-full bg-accent-500">
                    <img className="w-full h-1/2 object-cover" src={user?.picture?.substring(0, user?.picture?.indexOf("="))} alt="" />
                    <div className="w-full bg-accent-500 p-4 px-8">
                        <p className={`outline-transparent focus:outline-none border-black bg-transparent transition-all duration-75 font-sans text-4xl 2xl:text-6xl font-bold my-4 w-full`}>
                            {user?.companyName ? user?.companyName : "Sin nombre"}
                        </p>
                        <p className={`outline-transparent focus:outline-none border-black bg-transparent transition-all duration-75 text-lg 2x:text-2xl mb-2 w-full`}>
                            {user?.phone ? user?.phone : "Sin teléfono"}
                        </p>
                        <p className={`outline-transparent focus:outline-none border-black bg-transparent transition-all duration-75 text-lg 2x:text-2xl mb-2 w-full`}>
                            {user?.schedule?.length > 0 ? user?.schedule : "Sin horario"}
                        </p>
                    </div>
                </div>
                <div className="relative w-full h-full col-span-2 bg-w-500 px-12 py-8">
                    <Link to="/home">
                        <Logo className="absolute h-16 top-0 right-0" />
                    </Link>
                    <h2 className="text-5xl font-bold">Preguntas comunes</h2>
                    <div className="absolute bottom-8 left-1/2 translate-x-[-50%] bg-ab-500 h-12 w-4/5 flex justify-between">
                        <button
                            className="bg-b-500 text-white font-bold flex items-center justify-center w-12 h-full font-sans text-2xl"
                        >Q</button>
                        <input type="text" name="" id=""
                            className="bg-transparent outline-transparent focus:outline-none text-2xl w-4/5 h-full text-white placeholder-white/80 px-4 flex-1"
                            placeholder="¿Qué duda tienes?"
                            value={newQuestion}
                            onChange={(e) => setNewQuestion(e.target.value)}
                        />
                        <button
                            className="bg-b-500 text-white font-bold flex items-center justify-center w-12 h-full font-sans text-2xl"
                            onClick={() => {
                                setQuestions([...questions, { question: newQuestion }]);
                            }}
                        >?</button>


                    </div>
                    {
                        commonQuestions.length === 0 ? (
                            <div className="flex flex-col justify-center items-center my-10">
                                <p className="text-xl mb-4 italic">Aún no se han añadido preguntas frecuentes.</p>
                            </div>
                        ) : (
                            commonQuestions.map(question => (
                                <div key={question.id} className="flex justify-between items-center bg-white p-4 my-2 rounded-lg">
                                    <p className="text-lg">{question.question}</p>
                                    <button
                                        className="bg-ab-500 text-white p-2 rounded-lg"
                                        onClick={() => {
                                            navigator.clipboard.writeText(question.question);
                                            setShowCopied(true);
                                            setTimeout(() => setShowCopied(false), 2000);
                                        }}
                                    >
                                        <Share className="w-6" />
                                    </button>
                                </div>
                            ))
                        )
                    }
                </div>
                <div className="w-full h-full bg-b-500 py-8 px-4">
                    <h2 className="text-5xl font-bold text-white text-center">Tus preguntas</h2>
                    <div>
                        {
                            questions.length === 0 ?
                                (
                                    <div className="flex flex-col justify-center items-center my-10">
                                        <p className="text-xl mb-4 text-white italic">Aún no has hecho preguntas</p>
                                    </div>
                                ) :
                                (
                                    questions.map(question => (
                                        <div key={question.id} className="flex justify-between items-center bg-white m-8 mb-4">
                                            <p className="text-lg m-2">{question.question}</p>
                                            <button className="bg-ab-500 h-12 w-12 text-white font-bold font-sans text-2xl">?</button>
                                        </div>
                                    ))
                                )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
