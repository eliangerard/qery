export const Message = ({ content, mine, user }) => {
    return (
        <div className={`flex ${mine ? "justify-end" : "justify-start"} w-full`}>
            <div className="flex max-w-[90%] justify-between mb-2">
                <p className={`${user.ai ? "bg-green-500 text-white" : (mine ? "bg-accent-500" : "bg-b-500 text-white")} flex-1 break-words text-pretty max-w-full items-center px-2 py-1`}>{content}</p>
            </div>
        </div>
    )
}
