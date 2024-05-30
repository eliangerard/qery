import { useEffect, useRef, useState } from "react"
import { Add } from "../ui/Icons/Add"
import { server } from "../pages/util/server"
import { Question } from "../ui/Question"

export const FAQs = ({ company, clientSide, showRight, setShowRight }) => {
    const container = useRef(null)
    const [questions, setQuestions] = useState([]) // [ { question: "", answer: "" } ]
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [show, setShow] = useState(false);

    useEffect(() => {
        fetch(`${server}/faq/${company._id}`)
            .then(res => res.json())
            .then(({ faqs }) => {
                setQuestions(faqs);
            })
    }, [company])

    useEffect(() => {
        function handleClickOutside(event) {
            if (container.current && !container.current.contains(event.target)) {
                setShowRight(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [container, setShowRight]);

    const handleSave = () => {
        if (!question || !answer) return;
        if (question.trim() === "" || answer.trim() === "") return;
        setQuestions(questions => [...questions, { question, answer }]);
        setQuestion("");
        setAnswer("");
        fetch(`${server}/faq`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ question, answer })
        }).then(res => res.json())
            .then(data => {
                console.log(data);
            })
    }

    return (

        <div ref={container} className={`absolute xl:static right-0 ${showRight ? "translate-x-0" : "translate-x-[100%] w-0 px-0 w-full"} overflow-hidden xl:translate-x-0 xl:w-[50vh] max-w-[50vh] z-50 h-full bg-b-500 transition-all`}>
            <div className="relative px-8 py-8">
                <button className={`left-0 top-0 absolute xl:hidden z-10 h-12 w-12 flex items-center justify-center bg-b-500 text-white font-bold transition-all`}
                    onClick={() => setShowRight(show => !show)}
                >FAQ
                </button>
                <h2 className="text-5xl mb-4 font-bold text-white text-center flex items-center justify-center">
                    {!clientSide &&
                        <div className="hover:cursor-pointer"
                            onClick={() => setShow(prev => !prev)}
                        >
                            {questions.length > 0 && <Add className="h-10 mr-2" />}
                        </div>
                    }
                    FAQs
                </h2>
                {clientSide ? <></> :
                    <div className="flex flex-col justify-center items-center mt-5">
                        {show ?
                            <>
                                <div>
                                    <p className="text-center text-2xl text-white mb-4">Agrega una FAQ</p>
                                    <input className="bg-white w-full mb-2 h-12 text-xl px-2 border-none font-['Poppins'] focus:outline-0 focus:placeholder:text-zinc-600 transition-all" type="text" placeholder="Pregunta"
                                        value={question} onChange={(e) => setQuestion(e.target.value)}
                                    />
                                    <textarea className="bg-white w-full h-12 text-xl px-2 border-none font-['Poppins'] focus:outline-0 focus:placeholder:text-zinc-600 transition-all" placeholder="Respuesta"
                                        value={answer} onChange={(e) => setAnswer(e.target.value)}
                                    ></textarea>
                                </div>
                                <div className="flex justify-end w-full mb-2">
                                    <button className="px-6 py-1 font-medium bg-ab-500 text-white mr-2 text-xl" onClick={() => setShow(false)}>Cancelar</button>
                                    <button className="px-6 py-1 font-medium bg-accent-500 text-xl" onClick={handleSave}>Guardar</button>
                                </div>
                            </> :
                            <>
                                {
                                    questions.length == 0 &&
                                    <>
                                        <p className="text-xl text-center text-white mb-4">Aún no has añadido preguntas frecuentes.</p>
                                        <button onClick={() => setShow(prev => !prev)}>
                                            <Add className="w-12" />
                                        </button>
                                        <p className="text-xl text-center text-white mt-4">Puedes agregar más dudas comunes de tus clientes.</p>
                                    </>
                                }
                            </>
                        }
                    </div>
                }
                {
                    questions.map((q, i) => (
                        <Question key={i} question={q.question} answer={q.answer} />
                    ))
                }
            </div>
        </div>
    )
}
