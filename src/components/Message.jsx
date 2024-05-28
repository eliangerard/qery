import { useEffect, useState } from "react"
import { SquareLoader } from "react-spinners";
import { server } from "../pages/util/server";
import { Product } from "../ui/Product";

export const Message = ({ company, content = "", mine, user, date }) => {

    const [dynamic, setDynamic] = useState(false);
    const [loading, setLoading] = useState(false);
    const [product, setProduct] = useState(null);

    useEffect(() => {
        if (content.includes("@prod") && content.includes("-")) {
            const productId = content.substring(content.indexOf('@prod') + 1, content.indexOf('-'));
            if (content.indexOf('@prod') != 0 || content.indexOf('-') != content.length)
                setDynamic(true);
            setLoading(true);
            fetch(`${server}/users/account/product/${company._id}/${productId}`, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } })
                .then(res => res.json())
                .then(res => {
                    console.log(res);
                    setProduct(res);
                    setLoading(false);
                })
        }
    }, [])
    const currentDate = new Date(date);
    const currentDay = currentDate.toLocaleDateString('es-MX', { weekday: 'long' });
    const currentHour = currentDate.toLocaleTimeString('es-MX', { hour: 'numeric', hour12: false });
    const currentMinutes = currentDate.toLocaleTimeString('es-MX', { minute: 'numeric' });

    return (
        <div className={`flex flex-col ${dynamic ? "items-center" : mine ? "items-end" : "items-start"} w-full`}>
            {
                dynamic ? (loading ? <div className="p-4">
                    <SquareLoader color="#000" size={15} />
                </div>
                    :
                    (
                        product.error ? <p className="bg-red-500 text-white flex-1 break-words text-pretty max-w-full items-center px-2 py-1">Producto no disponible</p> :
                            <div className="w-[80%] sm:w-[450px]">
                                <Product {...{ ...product, preselectedQuantity: content.split('-')[1] }} />
                            </div>
                    )
                ) :
                    <>
                        <i className="text-sm">{(currentDay != new Date().toLocaleDateString('es-MX', { weekday: 'long'}) ? currentDay + ', ' : '') + currentHour+':'+currentMinutes}</i>
                        <div className="flex max-w-[80%] justify-between mb-2">
                            <p className={`${user.ai ? "bg-green-500 text-white" : (mine ? "bg-accent-500" : "bg-b-500 text-white")} flex-1 break-words text-pretty max-w-full items-center px-2 py-1`}>{content}</p>
                        </div>
                    </>
            }
        </div>
    )
}
