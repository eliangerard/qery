import { Link } from "react-router-dom"

export const Chat = ({ _id: id, user, lastMessage, newMessages }) => {
    return (
        <div className={`w-full mb-2 `}>
            <Link to={`/chat/${id}`} className={`flex w-full justify-between hover:cursor-pointer ${!lastMessage.user.name ? 'opacity-75' : ''}`}>
                <p className={`w-[200px] text-center bg-ab-500 py-1 text-white ${!lastMessage.user.name ? 'font-regular' : 'font-semibold'}`}>{user}</p>
                <p className={`bg-accent-500 truncate flex-1 items-center px-2 py-1 ${!lastMessage.user.name ? 'opacity-75' : ''}`}>
                    {lastMessage.content.startsWith("@prod") ? <i>Producto enviado</i> : lastMessage.content}
                </p>
                {lastMessage.user.name && <p className="bg-ab-500 w-8 max-8 text-white font-semibold flex items-center justify-center">{newMessages}</p>}
            </Link>
        </div>
    )
}
