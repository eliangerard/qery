import { useContext, useEffect, useState } from "react";
import { server } from "./util/server";
import UserContext from "../context/UserContext";
import { SquareLoader } from "react-spinners";
import { useLocation } from "react-router-dom";
import { Product } from "../ui/Product";

export const Orders = ({ header = true, company, popup, sendMessage }) => {

    const { user } = useContext(UserContext);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const { pathname } = useLocation();
    console.log(window.location);

    useEffect(() => {
        setLoading(true);
        fetch(`${server}/users/account/payouts`, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } })
            .then(res => {
                return res.json();
            })
            .then(res => {
                if (res.error) return console.error(res.error);
                console.log(res);
                setLoading(false);
                setProducts(res);
            })
    }, [company])

    return (
        <>
            {(user ? user.stripeAccount : company.stripeAccount) ?
                !popup && <div className="flex justify-between my-4 items-center">
                    <h2 className="text-4xl font-bold my-4">Ordenes</h2>
                    <a
                        className="bg-stripe-500 font-['Poppins'] text-white w-fit flex items-center justify-center p-2 font-semibold"
                        href="https://dashboard.stripe.com/"
                    >
                        <img className="h-4 px-2" src="/stripe.svg" alt="" />
                        Dashboard
                    </a>
                </div>
                : <div className="flex justify-around my-4 items-center">
                    <h2 className="text-4xl font-bold my-4">Ordenes</h2>
                    <p className="font-medium">Observa tus ordenes vinculandoo tu cuenta de Stripe</p>
                    <button
                        className="bg-stripe-500 text-white w-fit flex items-center justify-center p-2 font-semibold"
                        onClick={() => {
                            fetch(`${server}/users/account`, {
                                method: "POST",
                                headers: {
                                    'Content-Type': 'application/json',
                                    Authorization: `Bearer ${localStorage.getItem('token')}`
                                }
                            }).then(res => res.json()).then(res => {
                                if (res.error) return console.error(res.error);
                                console.log(res);
                                if (res.linked) return;
                                fetch(`${server}/users/account/link`, {
                                    method: "POST",
                                    headers: {
                                        'Content-Type': 'application/json',
                                        Authorization: `Bearer ${localStorage.getItem('token')}`
                                    },
                                    body: JSON.stringify({ account: res.account })
                                }).then(res => res.json()).then(res => {
                                    if (res.error) return console.error(res.error);
                                    console.log(res);
                                    window.location.href = res.url;
                                });
                            })
                        }}
                    >
                        <img className="h-4 mr-2 px-2" src="/stripe.svg" alt="" />
                        Vincula tu cuenta</button>
                </div>}
            {loading ?
                <div className="flex items-center justify-center  h-96 w-full">
                    <SquareLoader color="#000" size={50} />
                </div>
                :
                <div className="grid sm:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2 gap-6 mb-auto">
                    {products?.map(product => (
                        <Product key={product._id} popup={popup} sendMessage={sendMessage} {...product} />
                    ))}
                </div>
            }
        </>
    )
}
