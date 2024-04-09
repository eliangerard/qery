import { useContext, useEffect, useState } from "react"
import { Edit } from "../ui/Icons/Edit";
import { Logo } from "../ui/Icons/Logo";
import { Link } from "react-router-dom";
import UserContext from "../context/UserContext";
import { Add } from "../ui/Icons/Add";
import { Share } from "../ui/Icons/Share";
import { Routes, Route, Navigate } from "react-router-dom";
import { Back } from "../ui/Icons/Back";
import { Profile } from "../components/Profile";
import { FAQs } from "../components/FAQs";
import { Chat } from "../components/Chat";
import { socket } from "./util/socket";
import { ChatComplete } from "./ChatComplete";
import { server } from "./util/server";

export const Home = () => {

    const { user } = useContext(UserContext);

    const [showLeft, setShowLeft] = useState(false);
    const [showRight, setShowRight] = useState(false);

    const [showCopied, setShowCopied] = useState(false);

    const [conversations, setConversations] = useState([]);

    useEffect(() => {
        socket.on('connect', () => console.log("Connected to server"));
        socket.on('new conversation', (conversation) => {
            console.log("New conversation", conversation);
            setConversations((conv) => [...conv, conversation])
        });
        socket.on('new message', (message) => {
            console.log("New message", message);
            setConversations((conv) => {
                console.log("Conversation", conv);

                return conv.map((chat) => {
                    if (chat.id === message.conversation) {
                        return { ...chat, messages: [...chat.messages, message] }
                    }
                    return chat;

                })
            })
        });

        fetch(`${server}/conversations`).then(res => res.json()).then(res => {
            console.log("Conversations", res);
            setConversations(res)
        });

        return () => {
            socket.off('connect');
            socket.off('new conversation');
        }
    }, [])

    return (
        <div className="relative flex w-full h-full relative overflow-hidden">
            <Profile showLeft={showLeft} setShowLeft={setShowLeft} />
            <div className="relative flex justify-center flex-1 h-full col-span-2 bg-w-500 px-4 md:px-12 py-8 transition-all">
                <div className="flex absolute top-0 left-0 w-full justify-between">
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
                <div className="flex flex-col w-full pt-12 max-w-screen-md">
                    <Routes>
                        <Route path="/" element={(
                            <>
                                <h2 className="text-5xl font-bold mb-4 text-center">Tus Chats</h2>
                                {
                                    conversations.length ?
                                        conversations.map((chat) => (
                                            <Chat key={chat.id} {...chat} lastMessage={chat.messages[chat.messages.length - 1]} newMessages={chat.messages.length} />
                                        ))
                                        :
                                        <p className="text-center text-lg">Aún no tienes chats, ¡Comparte tu link para comenzar!</p>
                                    }
                            </>
                        )} />
                        <Route path="/chat/:id" element={<ChatComplete />} />
                        <Route path="/*" element={<Navigate to={"/"} />} />
                    </Routes>
                </div>
            </div>
            <FAQs showRight={showRight} setShowRight={setShowRight} />
        </div>
    )
}
