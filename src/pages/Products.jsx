import { useContext, useEffect, useState } from "react";
import { server } from "./util/server";
import UserContext from "../context/UserContext";
import { SquareLoader } from "react-spinners";

export const Products = () => {

    const { user } = useContext(UserContext);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        fetch(`${server}/users/account/products`, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } })
            .then(res => {
                return res.json();
            })
            .then(res => {
                if (res.error) return console.error(res.error);
                console.log(res);
                setLoading(false);
                setProducts(res.data);
            })
    }, [])

    return (
        <>
            {user.stripeAccount ?
                <div className="flex justify-end mb-4 items-center">
                    <a
                        className="bg-stripe-500 font-['Poppins'] text-white w-fit flex items-center justify-center p-2 font-semibold"
                        href="https://dashboard.stripe.com/"
                    >
                        <img className="h-4 px-2" src="/stripe.svg" alt="" />
                        Dashboard
                    </a>
                </div>
                : <div className="flex justify-around my-4 items-center">
                    <p className="font-medium">Muestra tus artículos vinculandoo tu cuenta de Stripe</p>
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
                <div className="flex items-center justify-center my-8 w-full">
                    <SquareLoader color="#000" size={50} />
                </div>
                :
                <div className="grid grid-cols-3 lg:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2 gap-6">
                    {products.map(product => (
                        <div key={product.id} className="flex items-center justify-between w-full">
                            <div>
                                <img className="min-h-32 h-full w-32 object-cover" src={product.images[0]} alt="" />
                            </div>
                            <div className="flex flex-col justify-between h-full flex-1">
                                <div className="p-2">
                                    <p className="font-bold text-xl leading-tight">{product.name}</p>
                                    <p className="font-medium">1 unidad</p>
                                </div>
                                <p>{product.price}</p>
                                <button
                                    className="bg-green-500 text-white font-bold w-full text-lg h-10"
                                    onClick={() => {
                                        fetch(`${server}/users/checkout/`, {
                                            method: "POST",
                                            headers: {
                                                'Content-Type': 'application/json',
                                                Authorization: `Bearer ${localStorage.getItem('token')}`
                                            },
                                            body: JSON.stringify({ priceId: product.default_price })
                                        }).then(res => res.json()).then(res => {
                                            if (res.error) return console.error(res.error);
                                            console.log(res);
                                            window.location.href = res.session.url;
                                        })
                                    }}>${product.prices.unit_amount.toString().substring(0, product.prices.unit_amount.toString().length - 2).toLocaleString('es-MX')}</button>
                            </div>
                        </div>
                    ))}
                </div>
            }
        </>
    )
}
