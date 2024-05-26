import { useEffect, useState } from "react";
import { server } from "./util/server";

export const Products = () => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch(`${server}/users/account/products`, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } })
            .then(res => {
                return res.json();
            })
            .then(res => {
                if (res.error) return console.error(res.error);
                console.log(res);
                setProducts(res.data);
            })
    }, [])

    return (
        <>
            <button
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
            >Link Stripe account</button>
            {products.map(product => (
                <div key={product.id} className="flex items-center justify-between p-4 border-b-2">
                    <p>{product.name}</p>
                    <p>{product.price}</p>
                    <button onClick={() => {
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
                    }}>Comprar</button>
                </div>
            ))}
        </>
    )
}
