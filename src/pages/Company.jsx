import { Link, Route, Routes } from "react-router-dom"
import { Chats } from "./Chats"
import { Products } from "./Products";

export const Company = () => {

    return (
        <>
            {/* <div className="flex mb-4 border-b-[3px] border-black">
                <Link to="chats">
                    <h2 className="text-3xl font-bold mr-4 text-center">Chats</h2>
                </Link>
                <Link to={'products'}>
                    <h2 className="text-3xl font-bold text-center">Vender</h2>
                </Link>
            </div> */}
            <div className="w-full"></div>
            <Routes>
                <Route path="products" element={<Products/>} />
                <Route path="*" element={<Chats/>} />
                
            </Routes>
        </>
    )
}
