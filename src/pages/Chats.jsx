import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import UserContext from "../context/UserContext";
import { socket } from "./util/socket";
import { server } from "./util/server";
import { Chat } from "../components/Chat";

export const Chats = () => {

    const { user } = useContext(UserContext);
    const { pathname } = useLocation();
    const [conversations, setConversations] = useState([]);

    useEffect(() => {
        console.log("haciendo eso q quieres");
        socket.emit('company', user);
        socket.on('new conversation', (conversation) => {
            console.log("New conversation", conversation);
            setConversations((conv) => [...conv, conversation]);
            socket.emit('join conversation', conversation.id);
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
            res.map((chat) => {
                socket.emit('join conversation', chat.id);
            });
        });

        return () => {
            socket.off('connect');
            socket.off('new conversation');
        }
    }, [pathname])
    return (
        <>
            <h2 className="text-5xl font-bold mb-4 text-center">Tus Chats</h2>
            {
                conversations.length ?
                    conversations.map((chat) => (
                        <Chat key={chat.id} {...chat} user={chat?.user?.name} lastMessage={chat.messages[chat.messages.length - 1]} newMessages={chat.messages.length} />
                    ))
                    :
                    <p className="text-center text-lg">Aún no tienes chats, ¡Comparte tu link para comenzar!</p>
            }
        </>
    )
}
