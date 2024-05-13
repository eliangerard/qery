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

    const [loadingSession, setLoadingSession] = useState(true);


    useEffect(() => {
        if (!localStorage.getItem('token')) {
            return setLoadingSession(false);
        }

        const loadSession = async () => {
            setLoadingSession(user ? false : true);
            const token = localStorage.getItem('token');
            try {
                const res = await fetch(`${server}/users`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    }
                });
                if (res.status === 401) {
                    console.log("Unauthroized");
                    throw new Error('Unauthorized');
                }
                const user = await res.json();
                setUser(user);
                setLoadingSession(false);
            } catch (error) {
                const refresh = await fetch(`${server}/auth/refresh`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('refresh')}`,
                    }
                })

                if (refresh.status === 401) {
                    localStorage.removeItem('token');
                    localStorage.removeItem('refresh');
                }

                if (refresh.status === 200) {
                    const data = await refresh.json();
                    localStorage.setItem('token', data.id_token);
                }
                window.location.reload();
            }
        }

        loadSession();
    }, [pathname])

    return (
        <> {!loadingSession &&
            <Routes>
                <Route path='/*' element={<Home />} />
                <Route path='/' element={user ? <Home /> : <Landing />} />
                <Route path='/admin/users' element={<Users />} />
            </Routes>
        }
        </>
    )
}
