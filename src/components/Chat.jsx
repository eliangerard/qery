import { Link } from "react-router-dom"

export const Chat = ({ _id: id, user, lastMessage, newMessages }) => {
    return (
        <Link to={`/chat/${id}`} className="w-full">
            <div className="flex w-full justify-between mb-2 hover:cursor-pointer">
                <p className="w-[150px] text-center bg-ab-500 py-1 text-white font-semibold">{user}</p>
                <p className="bg-accent-500 truncate flex-1 items-center px-2 py-1">{lastMessage.content}</p>
                <p className="bg-ab-500 w-8 max-8 text-white font-semibold flex items-center justify-center">{newMessages}</p>
            </div>
        </Link>
    )
}
