import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { server } from "./util/server";
import { v4 as uuidv4 } from 'uuid';
import { socket } from "./util/socket";
import { Share } from "../ui/Icons/Share";
import UserContext from "../context/UserContext";
import { Back } from "../ui/Icons/Back";

export const ChatComplete = () => {

	const { id } = useParams();

	const { user } = useContext(UserContext)

	const [conversation, setConversation] = useState({ messages: [] });
	const [newMessage, setNewMessage] = useState("");

	useEffect(() => {
		socket.on('new message', (message) => {
			console.log("New message", message);
			if (message.user.id == user._id) return;
			setConversation((conv) => {
				console.log("Conversation", conv);
				return { ...conv, messages: [...conv.messages, message] }
			})
		});

		fetch(`${server}/conversations/${id}`, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('token')}`
			}
		})
			.then(response => response.json())
			.then(data => setConversation(data));

		return () => {
			socket.off('new message');
			socket.off('new conversation');
		}
	}, []);

	const handleMessageSend = () => {
		const message = {
			conversation: conversation.id,
			id: uuidv4(),
			user: {
				id: user._id,
			},
			companyID: user._id,
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
		<>
			<div className="flex mb-4 mt-12 items-center">
				<Link to={"/"}><Back className={"h-6 mr-4"} /></Link>
				<h2 className="text-5xl font-bold w-full">Chat con {conversation?.messages[conversation?.messages?.length - 1]?.user?.name}</h2>
			</div>
			<div className="flex flex-col-reverse grow mb-8 overflow-y-auto">
				<div className="w-full h-fit flex flex-col items-end">
					{conversation && conversation.messages.map((message, index) => (
						message.user.id === user?._id ?
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
					))}
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
				<button className="bg-ab-500 w-12 h-12 flex items-center justify-center pr-0.5"
					onClick={handleMessageSend}
				><Share className={"w-4"} /></button>
			</div>
		</>
	)
}
