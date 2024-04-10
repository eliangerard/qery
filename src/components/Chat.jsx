import { Link } from "react-router-dom"

export const Chat = ({ id, lastMessage, newMessages }) => {
    return (
        <Link to={`/chat/${id}`} className="w-full">
            <div className="flex w-full justify-between mb-2 hover:cursor-pointer">
                <p className="w-fit bg-ab-500 px-4 py-1 text-white font-semibold">{lastMessage?.user?.name}:</p>
                <p className="bg-accent-500 flex-1 items-center px-2 py-1">{lastMessage.content}</p>
                <p className="bg-ab-500 w-8 max-8 text-white font-semibold flex items-center justify-center">{newMessages}</p>
            </div>
        </Link>
    )
}
