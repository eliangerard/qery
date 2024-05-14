export const Message = ({ content, mine }) => {
    return (
        <div className={`flex ${mine ? "justify-end" : "justify-start"} w-full`}>
            <div className="flex max-w-[90%] justify-between mb-2">
                <p className={`${mine ? "bg-accent-500" : "bg-b-500 text-white"} flex-1 break-all text-pretty max-w-full items-center px-2 py-1`}>{content}</p>
            </div>
        </div>
    )
}
