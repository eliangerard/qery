import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import UserContext from "../context/UserContext";
import { socket } from "./util/socket";
import { server } from "./util/server";
import { Chat } from "../components/Chat";
import { SquareLoader } from "react-spinners";

export const Chats = () => {
    const { user } = useContext(UserContext);
    const { pathname } = useLocation();
    const [conversations, setConversations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        socket.emit('company', user);
        socket.on('new conversation', (conversation) => {
            console.log("New conversation", conversation);
            setConversations((conv) => [...conv, conversation]);
            socket.emit('join conversation', conversation._id);
        });
        socket.on('new message', (recievedMessage) => {
            const message = recievedMessage.originalMessage.user.role === 'client' ? recievedMessage.translatedMessage : recievedMessage.originalMessage;
            console.log("New message", message);
            setConversations((conv) => {
                console.log("Conversation", conv);

                return conv.map((chat) => {
                    if (chat._id === message.conversation) {
                        return { ...chat, translatedMessages: [...chat.translatedMessages, message] }
                    }
                    return chat;

                })
            })
        });

        setLoading(true);
        fetch(`${server}/conversations`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }).then(res => res.json()).then(res => {
            console.log("Conversations", res);
            setConversations(res)
            setLoading(false);
            res.map((chat) => {
                socket.emit('join conversation', chat._id);
            });
        });

        return () => {
            socket.off('connect');
            socket.off('new conversation');
        }
    }, [pathname])
    return (
        <>
            {loading ?
                <div className="flex justify-center items-center h-96">
                    <SquareLoader color="#000000" size={50} />
                </div>
                : (conversations.length > 0 ?
                    <>
                        {
                            conversations.filter((chat) => chat.translatedMessages[chat.translatedMessages.length - 1]?.user?.name).reverse().map((chat) => (
                                <Chat key={chat._id} {...chat} user={chat?.user?.name} lastMessage={chat.translatedMessages[chat.translatedMessages.length - 1]} newMessages={chat.translatedMessages.length} />
                            ))
                        }
                        {
                            conversations.filter((chat) => !chat.translatedMessages[chat.translatedMessages.length - 1]?.user?.name).reverse().reverse().map((chat) => (
                                <Chat key={chat._id} {...chat} user={chat?.user?.name} lastMessage={chat.translatedMessages[chat.translatedMessages.length - 1]} newMessages={chat.translatedMessages.length} />
                            ))
                        }

                    </>
                    :
                    <p className="text-center text-lg">Aún no tienes chats, ¡Comparte tu link para comenzar!</p>)}
        </>
    )
}
