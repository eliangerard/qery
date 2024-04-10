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
import { Header } from "../ui/Header";

export const Home = () => {

    const { user } = useContext(UserContext);

    const [showLeft, setShowLeft] = useState(false);
    const [showRight, setShowRight] = useState(false);

    const [conversations, setConversations] = useState([]);

    useEffect(() => {
        socket.emit('company', user);
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

        fetch(`${server}/conversations`, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('token')}`
			}
		}).then(res => res.json()).then(res => {
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
                <Header showLeft={showLeft} setShowLeft={setShowLeft} showRight={showRight} setShowRight={setShowRight} />
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
