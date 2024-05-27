import { useEffect, useState } from "react";

export const Slide = ({ active, toggle = () => { } }) => {

    return (
        <div className={`w-24 ${active ? "bg-green-500" : "bg-ab-500"} hover:cursor-pointer h-12 flex items-center relative transition-all`}
            onClick={() => toggle(!active)}
        >
            <div className={`bg-white rounded-full w-8 h-8 absolute ${active ? "translate-x-[180%]" : "translate-x-[20%]"} transition-all`}></div>
        </div>
    )
}
