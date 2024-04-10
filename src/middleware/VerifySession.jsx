import { Route, Routes, useLocation, useNavigate } from "react-router-dom"
import { Home, Landing } from "../pages"
import Users from "../pages/admin/Users"
import { useContext, useEffect, useState } from "react"
import UserContext from "../context/UserContext"
import { server } from "../pages/util/server"

export const VerifySession = () => {

    const navigate = useNavigate();

    const { user, setUser } = useContext(UserContext);
    const { pathname } = useLocation();

    const [loadingSession, setLoadingSession] = useState(false);


    useEffect(() => {
        if (!localStorage.getItem('token')) {
            return;
        }

        const loadSession = async () => {
            setLoadingSession(user ? false : true);
            const token = localStorage.getItem('token');
            try {
                const user = await fetch(`${server}/users`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    }
                }).then(res => res.json()).then(res => res);
                console.log(user);
                setUser(user);
                setLoadingSession(false);
            } catch (error) {
                navigate('/')
            }
        }

        loadSession();
    }, [pathname])

    return (
        <> {!loadingSession && user &&
            <Routes>
                <Route path='/*' element={<Home />} />
                <Route path='/' element={user ? <Home /> : <Landing />} />
                <Route path='/admin/users' element={<Users />} />
            </Routes>
        }
        </>
    )
}
