import { useContext, useState } from "react"
import { Routes, Route, Navigate } from "react-router-dom";
import { Profile } from "../components/Profile";
import { FAQs } from "../components/FAQs";
import { ChatComplete } from "./ChatComplete";
import { Header } from "../ui/Header";
import { Chats } from "./Chats";
import UserContext from "../context/UserContext";
import { Company } from "./Company";

export const Home = () => {


    const {user} = useContext(UserContext);
    const [showLeft, setShowLeft] = useState(false);
    const [showRight, setShowRight] = useState(false);

    return (
        <div className="relative flex w-full h-full relative overflow-hidden">
            <Profile showLeft={showLeft} setShowLeft={setShowLeft} />
            <div className="relative flex justify-center flex-1 h-full max-w-screen overflow-hidden col-span-2 bg-w-500 px-4 md:px-12 py-8 transition-all">
                <Header company={user} showLeft={showLeft} setShowLeft={setShowLeft} showRight={showRight} setShowRight={setShowRight} />
                <div className="flex flex-col w-full max-w-screen">
                    <Routes>
                        <Route path={`/${user._id}/*`} element={<Company />} />
                        <Route path="/chat/:id" element={<ChatComplete />} />
                        <Route path="/*" element={<Navigate to={`/${user._id}`} />} />
                    </Routes>
                </div>
            </div>
            <FAQs showRight={showRight} setShowRight={setShowRight} />
        </div>
    )
}
