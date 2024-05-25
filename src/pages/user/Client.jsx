import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { server } from "../util/server";
import { Share } from "../../ui/Icons/Share";
import { v4 as uuidv4 } from 'uuid';
import { Profile } from "../../components/Profile";
import { FAQs } from "../../components/FAQs";
import { socket } from "../util/socket";
import { Header } from "../../ui/Header";

import { uniqueNamesGenerator, adjectives, colors, animals } from 'unique-names-generator';
import { Message } from "../../components/Message";

const customConfig = {
    dictionaries: [adjectives, colors],
    separator: '',
    length: 2,
};


export const Client = () => {

    const { username } = useParams();
    const [user, setUser] = useState({ id: uuidv4(), name: uniqueNamesGenerator(customConfig) });
    const [company, setCompany] = useState({});

    const [showLeft, setShowLeft] = useState(false);
    const [showRight, setShowRight] = useState(false);

    const [newMessage, setNewMessage] = useState("");
    const [conversation, setConversation] = useState({
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
        socket.on('new conversation', (conversation) => {
            console.log("New conversation", conversation);
            setConversation(conversation);
        });

        socket.on('new message', (message) => {
            console.log("Message received", message);
            if (message.user.id == user.id) return;
            setConversation((conv) => ({ ...conv, messages: [...conv.messages, message] }));
        });

        return () => {
            socket.off('connect');
            socket.off('disconnect');
            socket.off('new message');
            socket.off('new conversation');
        }
    }, [])

    const handleSendMessage = () => {
        if (newMessage === "") return;

        const message = {
            conversation: conversation._id,
            id: uuidv4(),
            user,
            companyID: company._id,
            content: newMessage.trim()
        };

        socket.emit('chat message', message, (error) => {
            if (error) return console.log(error);
            console.log("Message sent");
        });

        setNewMessage("");

        return setConversation((conv) => ({ ...conv, messages: [...conv.messages, message] }));
    }

    return (
        <div className="relative flex w-full h-full relative overflow-hidden">
            <Profile company={company} showLeft={showLeft} setShowLeft={setShowLeft} />
            <div className="relative flex flex-col justify-between flex-1 h-full col-span-2 bg-w-500 px-4 md:px-12 py-8 transition-all">
                <Header showLeft={showLeft} setShowLeft={setShowLeft} showRight={showRight} setShowRight={setShowRight} />
                <div className="mt-6 mb-4 text-center">
                    {/* <p className="text-lg font-semibold mb-4">¡Hola <input type="text" value={user.name} className="w-4 min-w-fit border-b-2 border-black" />!</p> */}
                    <h2 className="text-3xl text-center  md:text-5xl font-bold select-none">Chatea con {company?.companyName}</h2>
                </div>
                {conversation.messages.length > 0 ?
                    <div className="flex flex-col-reverse grow py-8 overflow-y-auto">
                        <div className="w-full h-fit flex flex-col items-end">
                            {conversation.messages.map((message, index) => (
                                <Message key={index} {...message} mine={user.id == message.user.id} />
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
                            if (e.key === 'Enter' && newMessage !== "") handleSendMessage();
                        }}
                    />
                    <button className="bg-ab-500 w-12 h-12 flex items-center justify-center pr-0.5"
                        onClick={handleSendMessage}
                    ><Share className={"w-4"} /></button>
                </div>

            </div>
            <FAQs clientSide={true} showRight={showRight} setShowRight={setShowRight} />
        </div>
    )
}
