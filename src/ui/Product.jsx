import { useState } from "react";
import { server } from "../pages/util/server";

export const Product = (product) => {

    const [loading, setLoading] = useState(false);
    const [quantity, setQuantity] = useState(1);

    return (
        <div className="flex items-center justify-between w-full">
            <div>
                <img className="min-h-32 h-full w-32 object-cover" src={product.images[0]} alt="" />
            </div>
            <div className="flex flex-col justify-between h-full flex-1">
                <div className="p-2 flex flex-col justify-around grow">
                    <p className="font-bold text-xl leading-tight">{product.name}</p>
                    <div className="flex">
                        <button className="bg-ab-500 flex items-center justify-center text-white font-bold w-6"
                            onClick={() => setQuantity(prev => prev - 1 < 1 ? 1 : prev - 1)}
                        >{'<'}</button>
                        <p className="bg-accent-500 w-10 text-center">{quantity}</p>
                        <button className="bg-ab-500 flex items-center justify-center text-white font-bold w-6"
                            onClick={() => setQuantity(prev => prev + 1)}
                        >{'>'}</button>
                    </div>
                </div>
                <p>{product.price}</p>
                <button
                    className={`bg-green-500 text-white font-bold w-full text-lg h-10 ${loading ? 'bg-green-500/50 animation-pulse' : ''} transition-all`}
                    disabled={loading}
                    onClick={() => {
                        setLoading(true);
                        fetch(`${server}/users/checkout/`, {
                            method: "POST",
                            headers: {
                                'Content-Type': 'application/json',
                                Authorization: `Bearer ${localStorage.getItem('token')}`
                            },
                            body: JSON.stringify({
                                priceId: product.default_price,
                                successUrl: `${window.location.href}`,
                                cancelUrl: `${window.location.href}`,
                                quantity,
                            })
                        }).then(res => res.json()).then(res => {
                            if (res.error) return console.error(res.error);
                            console.log(res);
                            window.location.href = res.session.url;
                        })
                    }}>${(product.prices.unit_amount * quantity).toString().substring(0, (product.prices.unit_amount * quantity).toString().length - 2).toLocaleString('es-MX')}</button>
            </div>
        </div>
    )
}
