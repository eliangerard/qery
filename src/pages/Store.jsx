import { Link, Route, Routes } from "react-router-dom"
import { Products } from "./Products"
import { Orders } from "./Orders"
import UserContext from "../context/UserContext";
import { useContext } from "react";

export const Store = () => {
    const {user} = useContext(UserContext);
    return (
        <>
            {user.stripeAccount && <div className="flex w-full text-4xl font-bold my-4 mt-8">
                <Link to="" className="mr-12">
                    <h2>Productos</h2>
                </Link>
                <Link to="orders">
                    <h2>Ordenes</h2>
                </Link>
            </div>}
            <Routes>
                <Route path="orders" element={<Orders popup />} />
                <Route path="*" element={<Products popup />} />
            </Routes>
        </>
    )
}
