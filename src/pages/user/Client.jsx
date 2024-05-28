/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Share } from "../../ui/Icons/Share";
import { v4 as uuidv4 } from 'uuid';
import { socket } from "../util/socket";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { uniqueNamesGenerator, adjectives, colors } from 'unique-names-generator';
import { Message } from "../../components/Message";
import 'regenerator-runtime/runtime'

const customConfig = {
    dictionaries: [adjectives, colors],
    separator: '',
    length: 2,
};


export const Client = ({ company }) => {

    const [user, setUser] = useState({ id: uuidv4(), name: uniqueNamesGenerator(customConfig), role: "client" });



    const [newMessage, setNewMessage] = useState("");
    const [conversation, setConversation] = useState({
        originalMessages: [],
        translatedMessages: []
    });

    const {
        transcript,
        listening,
        resetTranscript } = useSpeechRecognition();

    useEffect(() => {
        if (!listening && transcript !== "") {
            setNewMessage(transcript)
            resetTranscript();
        }
    }, [listening])

    useEffect(() => {
        socket.on('connect', () => console.log("Connected to server"));
        socket.on('disconnect', () => console.log("Disconnected from server"));
        socket.on('new conversation', (conversation) => {
            console.log("New conversation", conversation);
            setConversation(conversation);
        });

        socket.on('new message', (recievedMessage) => {
            const message = recievedMessage.originalMessage.user.role === 'company' ? recievedMessage.translatedMessage : recievedMessage.originalMessage;
            console.log("Message received", message);
            if (message.user.id == user.id) return;
            setConversation((conv) => ({ ...conv, originalMessages: [...conv.originalMessages, message] }));
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
            content: newMessage.trim(),
            date: new Date()
        };

        socket.emit('chat message', message, (error) => {
            if (error) return console.log(error);
            console.log("Message sent");
        });

        setNewMessage("");

        return setConversation((conv) => ({ ...conv, originalMessages: [...conv.originalMessages, message] }));
    }
    const sendMessage = (msg) => {
        if (msg === "") return;

        const message = {
            conversation: conversation._id,
            id: uuidv4(),
            user: {
                id: company._id,
                role: 'company'
            },
            companyID: company._id,
            content: msg.trim(),
            date: new Date()
        };

        socket.emit('chat message', message, (error) => {
            if (error) return console.log(error);
            console.log("Message sent");
        });

        setNewMessage("");

        return setConversation((conv) => ({ ...conv, originalMessages: [...conv.originalMessages, message] }));
    }

    return (

        <>
            {/* <div className="mt-6 mb-4 text-left">
                    {/* <p className="text-lg font-semibold mb-4">¡Hola <input type="text" value={user.name} className="w-4 min-w-fit border-b-2 border-black" />!</p> 
                    <p>Chatea con</p>
                    <p className="text-3xl md:text-4xl font-bold">{company?.companyName}</p>
                </div> */}
            {conversation.originalMessages.length > 0 ?
                <div className="flex flex-col-reverse grow py-8 overflow-y-auto">
                    <div className="w-full h-fit flex flex-col items-end">
                        {conversation.originalMessages.map((message, index) => (
                            <Message key={index} {...message} company={company} mine={user.id == message.user.id} sendMessage={sendMessage} />
                        ))

                        }
                    </div>
                </div>
                : <p className="text-center my-auto">¡Consulta cualquier duda que tengas!</p>
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
                <button className="px-2 bg-accent-500" onClick={SpeechRecognition.startListening}>
                    <img className={`h-5 ${listening ? 'animate-ping' : ''}`} src="/mic.svg" alt="" />
                </button>
                <button className="bg-ab-500 w-12 h-12 flex items-center justify-center pr-0.5"
                    onClick={handleSendMessage}
                ><Share className={"w-4"} /></button>
            </div>
        </>
    )
}
