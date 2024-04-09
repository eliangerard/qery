import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { server } from "../util/server";
import { Share } from "../../ui/Icons/Share";
import { Logo } from "../../ui/Icons/Logo";
import { v4 as uuidv4 } from 'uuid';
import { Profile } from "../../components/Profile";
import { FAQs } from "../../components/FAQs";
import { socket } from "../util/socket";

export const Client = () => {

    const { username } = useParams();
    const [user, setUser] = useState({ id: uuidv4() });
    const [company, setCompany] = useState({});
    const [showCopied, setShowCopied] = useState(false);

    const [showLeft, setShowLeft] = useState(false);
    const [showRight, setShowRight] = useState(false);

    const [newQuestion, setNewQuestion] = useState("");

    const [questions, setQuestions] = useState([]);
    const [commonQuestions, setCommonQuestions] = useState([]);

    const [newMessage, setNewMessage] = useState("");
    const [conversation, setConversation] = useState({
        id: uuidv4(),
        messages: []
    });

    useEffect(() => {
        const loadUser = async () => {
            const res = await fetch(`${server}/users/${encodeURI(username)}`).then(res => res.json()).then(res => res);
            setCompany(res);
        }
        loadUser();
    }, [username])

    useEffect(() => {
        socket.on('connect', () => console.log("Connected to server"));
        socket.on('disconnect', () => console.log("Disconnected from server"));

        socket.on('new message', (message) => {
            console.log("Message received", message);
            if (message.user == user.id) return;
            setConversation((conv) => ({ ...conv, messages: [...conv.messages, message] }));
        });

        return () => {
            socket.off('connect');
            socket.off('disconnect');
            socket.off('new message');
        }
    }, [])

    return (
        <div className="relative flex w-full h-full relative overflow-hidden">
            <Profile company={company} showLeft={showLeft} setShowLeft={setShowLeft}/>
            <div className="relative flex flex-col flex-1 h-full col-span-2 bg-w-500 px-4 md:px-12 py-8 transition-all">
                <div className="flex absolute top-0 left-0 w-full max-w-screen-md justify-between">
                    <div className="flex relative">
                        <button className={`flex relative z-50 ${showLeft ? "left-[25rem]" : "left-0"} lg:left-0 items-center justify-center pt-0.5 w-12 h-12 text-xl bg-accent-500 font-bold text-accent-500 transition-all`}
                            onClick={() => setShowLeft(show => !show)}
                        >
                            <div className="rounded-full flex items-center justify-center bg-black text-sm h-6 w-6">i</div>
                        </button>
                        <div className="relative flex h-12">
                            <button className="relative bg-ab-500 w-12 h-12 flex items-center justify-center pr-1 pt-1 rounded-r-full hover:translate-x-[0.5rem] active:translate-x-[0.2rem] transition-all duration-75 z-10"
                                onClick={() => {
                                    const company = encodeURI(user?.companyName.toLowerCase())
                                    const link = "https://qery.me/user/" + company;
                                    navigator.clipboard.writeText(link);
                                    setShowCopied(true);
                                    setTimeout(() => setShowCopied(false), 2000);
                                }}
                            >
                                <div className={`${showCopied ? "opacity-100 max-h-8 p-2" : "opacity-0 max-h-0"} absolute bg-white w-40 overflow-hidden right-[-100%] translate-x-[75%] top-1/2 translate-y-[-50%] rounded-full transition-all`}>
                                    <p className="font-semibold text-sm">¡Enlace copiado!</p>
                                </div>
                                <Share className="w-4" />
                            </button>
                            <div className="absolute w-4 bg-ab-500 h-12 left-0 top-0"></div>
                        </div>
                    </div>
                    <div className="flex">
                        <Link to="/home">
                            <Logo className="h-12" />
                        </Link>
                        <button className={`${showRight ? "right-[28rem]" : "right-0"} xl:right-0 relative z-10 h-12 w-12 flex items-center justify-center bg-b-500 text-white font-bold transition-all`}
                            onClick={() => setShowRight(show => !show)}
                        >FAQ</button>
                    </div>
                </div>
                <h2 className="text-5xl mt-12 font-bold mb-4 text-center">Chatea con {company?.companyName}</h2>
                {conversation.messages.length > 0 ? 
                <div className="flex flex-col-reverse grow mb-8 overflow-y-auto">
                    <div className="w-full h-fit flex flex-col items-end">
                        {conversation.messages.map((message, index) => (
                            user.id == message.user ?
                                <div key={index} className="flex justify-end w-full">
                                    <div className="flex max-w-10/12 justify-between mb-2 hover:cursor-pointer">
                                        <p className="bg-accent-500 flex-1 break-all text-pretty max-w-full items-center px-2 py-1">{message.content}</p>
                                    </div>
                                </div>
                                :
                                <div key={index} className="flex justify-start w-full h-fit">
                                    <div className="flex max-w-10/12 justify-between mb-2 hover:cursor-pointer">
                                        <p className="bg-b-500 text-white max-w-full flex-1 items-center px-2 py-1">{message.content}</p>
                                    </div>
                                </div>
                        ))
                        
                    }
                    </div>
                </div>
                : <p className="text-center">¡Consulta cualquier duda que tengas!</p>
                }

                <div className="flex relative bottom-0 w-full left-0">
                    <div className="bg-ab-500 h-12 w-12 items-center justify-center flex text-xl">
                        <p className="font-sans font-bold text-white">Q</p>
                    </div>
                    <input
                        className="bg-accent-500 flex-1 text-lg placeholder:text-black/75 px-2 focus:outline-none"
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)} placeholder="Envía un mensaje"
                        onKeyPress={(e) => {
                            if (e.key === 'Enter' && newMessage !== "") {
                                const message = {
                                    conversation: conversation.id,
                                    id: uuidv4(),
                                    user: user.id,
                                    content: newMessage.trim()
                                };

                                socket.emit('chat message', message, (error) => {
                                    if (error) return console.log(error);
                                    console.log("Message sent");
                                });

                                setNewMessage("");

                                return setConversation((conv) => ({ ...conv, messages: [...conv.messages, message] }));
                            }
                        }}
                    />
                    <button className="bg-ab-500 w-12 h-12 flex items-center justify-center pr-0.5"
                        onClick={() => {
                            if (newMessage === "") return;

                            const message = {
                                conversation: conversation.id,
                                id: uuidv4(),
                                user: user.id,
                                content: newMessage.trim()
                            };

                            socket.emit('chat message', message, (error) => {
                                if (error) return console.log(error);
                                console.log("Message sent");
                            });

                            setNewMessage("");

                            return setConversation((conv) => ({ ...conv, messages: [...conv.messages, message] }));
                        }}
                    ><Share className={"w-4"} /></button>
                </div>

            </div>
            <FAQs clientSide={true} showRight={showRight} setShowRight={setShowRight} />
        </div>
    )
}
