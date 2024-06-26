import { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { server } from "./util/server";
import { v4 as uuidv4 } from 'uuid';
import { socket } from "./util/socket";
import { Share } from "../ui/Icons/Share";
import UserContext from "../context/UserContext";
import { Back } from "../ui/Icons/Back";
import { Message } from "../components/Message";
import 'regenerator-runtime/runtime'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { Products } from "./Products";

export const ChatComplete = () => {

	const { id } = useParams();

	const { user } = useContext(UserContext)
	const navigate = useNavigate();
	const productsContainer = useRef(null)

	const [conversation, setConversation] = useState({ translatedMessages: [], originalMessages: [] });
	const [newMessage, setNewMessage] = useState("");
	const [showProducts, setShowProducts] = useState(false);

	const {
		transcript,
		listening,
		resetTranscript,
		browserSupportsSpeechRecognition
	} = useSpeechRecognition();

	useEffect(() => {
		if (!listening && transcript !== "") {
			setNewMessage(transcript)
			resetTranscript();
		}
	}, [listening])

	useEffect(() => {
		socket.emit('present', conversation._id);

		window.onbeforeunload = () => {
			socket.emit('absent', conversation._id);
		}

		return () => {
			socket.emit('absent', conversation._id);
		}
	}, [conversation._id])

	useEffect(() => {
		socket.on('new message', (recievedMessage) => {
			const message = recievedMessage.originalMessage.user.role === 'client' ? recievedMessage.translatedMessage : recievedMessage.originalMessage;
			console.log("New message", message);
			if (!message.user.ai && message.user.id == user._id) return;
			setConversation((conv) => {
				console.log("Conversation", conv);
				return { ...conv, translatedMessages: [...conv.translatedMessages, message] }
			})
		});

		fetch(`${server}/conversations/${id}`, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('token')}`
			}
		})
			.then(response => {
				if(response.status !== 200) 
					return navigate('/')

				return response.json()
			})
			.then(data => setConversation(data));

		return () => {
			socket.off('new message');
			socket.off('new conversation');
		}
	}, []);

	const handleMessageSend = () => {

		if (newMessage.trim() === "") return;

		const message = {
			conversation: conversation._id,
			id: uuidv4(),
			user: {
				id: user._id,
				role: 'company'
			},
			companyID: user._id,
			content: newMessage.trim(),
			date: new Date()
		};

		socket.emit('chat message', message, (error) => {
			if (error) return console.log(error);
			console.log("Message sent");
		});

		resetTranscript();
		setNewMessage("");

		return setConversation((conv) => ({ ...conv, translatedMessages: [...conv.translatedMessages, message] }));
	}

	const sendMessage = (msg) => {

		if (msg.trim() === "") return;

		const message = {
			conversation: conversation._id,
			id: uuidv4(),
			user: {
				id: user._id,
				role: 'company'
			},
			companyID: user._id,
			content: msg.trim(),
			date: new Date()
		};

		socket.emit('chat message', message, (error) => {
			if (error) return console.log(error);
			console.log("Message sent");
		});

		resetTranscript();
		setNewMessage("");

		return setConversation((conv) => ({ ...conv, translatedMessages: [...conv.translatedMessages, message] }));
	}

	return (
		<>
			{/* <div className="mb-2 items-center justify-left">
				<h2 className="mr-10 font-medium mb-2 w-full">Chat con</h2>
				<div className="flex items-center">
					<Link to={"/"}><Back className={"h-6 mr-4"} /></Link>
					<p className="text-3xl md:text-4xl font-bold">{conversation?.user?.name}</p>
				</div>
				<div className="w-10"></div>
			</div>
			{user.subscribed && <p className="text-left">Mientras tengas este chat abierto, las respuestas automáticas estarán deshabilitadas.</p>} */}
			<div className="flex flex-col-reverse w-full h-full mt-4 pt-16 pb-8 overflow-y-auto">
				<div className="w-full h-fit flex flex-col items-end">
					{conversation && conversation.translatedMessages.map((message, index) => (
						<Message sendMessage={sendMessage} key={index} {...message} company={user} mine={message.user.id === user?._id} ai={message.user.ai} />
					))}
				</div>
			</div>
			<div ref={productsContainer} className={`flex h-fit pb-24 w-full left-0 flex-1 bg-white flex-col items-center absolute py-4 ${showProducts ? 'bottom-4' : '-bottom-full'} transition-all`}>
				<div className="h-full overflow-y-auto">
					<Products popup sendMessage={sendMessage}/>
				</div>
			</div>
			<div className="flex relative bottom-0 w-full h-fit left-0">
				<div className="bg-ab-500 h-12 w-12 items-center justify-center flex text-xl">
					<p className="font-sans font-bold text-white">Q</p>
				</div>
				<input
					className="bg-accent-500 flex-1 text-lg placeholder:text-black/75 px-2 h-12 focus:outline-none"
					type="text"
					value={newMessage}
					onChange={(e) => setNewMessage(e.target.value)}
					placeholder="Envía un mensaje"
					onKeyPress={(e) => {
						if (e.key === 'Enter' && newMessage !== "") handleMessageSend();
					}}
				/>
				<button className="flex items-center justify-center w-12 bg-accent-500" onClick={SpeechRecognition.startListening}>
					<img className={`h-5 ${listening ? 'animate-ping' : ''}`} src="/mic.svg" alt="" />
				</button>
				<button className="px-2 bg-green-500 text-white font-bold flex items-center justify-center w-12 text-3xl" onClick={() => setShowProducts(prev => !prev)}>
					+
				</button>
				<button className="bg-ab-500 w-12 h-12 flex items-center justify-center pr-0.5"
					onClick={handleMessageSend}
				><Share className={"w-4"} /></button>
			</div>
		</>
	)
}
