import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { server } from "./util/server";
import { v4 as uuidv4 } from 'uuid';
import { socket } from "./util/socket";
import { Share } from "../ui/Icons/Share";
import UserContext from "../context/UserContext";

export const ChatComplete = () => {

	const { id } = useParams();

	const { user } = useContext(UserContext)
	console.log("User", user);

	const [conversation, setConversation] = useState({ messages: [] });
	const [newMessage, setNewMessage] = useState("");

	useEffect(() => {
		socket.on('new message', (message) => {
			if (message.user == user._id) return;
			console.log("New message", message);
			setConversation((conv) => {
				console.log("Conversation", conv);
				return { ...conv, messages: [...conv.messages, message] }
			})
		});

		fetch(`${server}/conversations/${id}`)
			.then(response => response.json())
			.then(data => setConversation(data));

		return () => {
			socket.off('new message');
		}
	}, []);

	return (
		<>
			<h2 className="text-5xl mt-12 font-bold mb-4 w-full">Chat con {id}</h2>
			<div className="flex flex-col-reverse grow mb-8 overflow-y-auto">
				<div className="w-full h-fit flex flex-col items-end">
					{conversation && conversation.messages.map((message, index) => (
						message.user === user?._id ?
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
					className="bg-accent-500 flex-1 text-lg placeholder:text-black/75 px-2 h-12"
					type="text"
					value={newMessage}
					onChange={(e) => setNewMessage(e.target.value)}
					placeholder="Envía un mensaje"
				/>
				<button className="bg-ab-500 w-12 h-12 flex items-center justify-center pr-0.5"
					onClick={() => {
						if (newMessage === "") return;

						const message = {
							conversation: conversation.id,
							id: uuidv4(),
							user: user._id,
							content: newMessage.trim()
						};
						console.log("User", user);
						console.log("Message", message);

						socket.emit('chat message', message);

						setNewMessage("");

						return setConversation((conv) => ({ ...conv, messages: [...conv.messages, message] }));
					}}
				><Share className={"w-4"} /></button>
			</div>
		</>
	)
}
