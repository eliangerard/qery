import { Route, Routes, useParams } from "react-router-dom"
import { Products } from "../Products"
import { Client } from "./Client"
import { useEffect, useState } from "react"
import { server } from "../util/server"
import { Profile } from "../../components/Profile"
import { FAQs } from "../../components/FAQs"
import { Header } from "../../ui/Header"

export const Home = () => {


    const { username } = useParams();
    const [company, setCompany] = useState({});
    const [showLeft, setShowLeft] = useState(false);
    const [showRight, setShowRight] = useState(false);

    useEffect(() => {
        const loadUser = async () => {
            const res = await fetch(`${server}/users/${encodeURI(username)}`).then(res => res.json()).then(res => res);
            console.log(res);
            setCompany(res);
        }
        loadUser();
    }, [])

    return (
        <div className="relative flex w-full h-full relative overflow-hidden">
            <Profile company={company} showLeft={showLeft} setShowLeft={setShowLeft} />
            <div className="relative flex flex-col justify-between flex-1 h-full col-span-2 bg-w-500 px-4 md:px-12 py-8 transition-all">
                <Header company={company} showLeft={showLeft} setShowLeft={setShowLeft} showRight={showRight} setShowRight={setShowRight} />
                <Routes>
                    <Route path="products" element={<Products company={company} />} />
                    <Route path="*" element={<Client company={company} />} />
                </Routes>
            </div>
            <FAQs clientSide={true} showRight={showRight} setShowRight={setShowRight} />
        </div>
    )
}
