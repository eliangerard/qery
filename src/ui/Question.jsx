import { useState } from "react";

export const Question = ({ question, answer }) => {
    const [show, setShow] = useState(false);
    return (
        <div className="my-2 justify-between w-full transition-all">
            <div className="flex justify-between w-full transition-all">
                <div className="w-full bg-white py-2 transition-all">
                    <p className="text-xl font-medium flex items-center px-2 flex-1 text-black bg-white truncate transition-all">{question}</p>
                    <p className={`text-xl bg-white px-2 ${show ? 'max-h-96 pt-2' : 'max-h-0 pt-0'} overflow-hidden transition-all`}>{answer}</p>
                </div>
                <button className="px-4 py-2 text-xl text-white font-bold font-['Prompt'] bg-ab-500 transition-all"
                    onClick={() => setShow(prev => !prev)}
                >?</button>
            </div>
        </div>
    )
}
