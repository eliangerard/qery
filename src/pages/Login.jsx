import { useState } from 'react'
import { useGoogleLogin } from '@react-oauth/google';

export const Login = () => {
  const [user, setUser] = useState(null);

  const login = useGoogleLogin({
    onSuccess: tokenResponse => setUser(tokenResponse),
  });

  return (
    <>
      <button
        onClick={login}
        className='border-2 border-gray-300 p-2 rounded-md'
      >
        Iniciar sesión con Google
      </button>
      <pre>
        {JSON.stringify(user, null, 2)}
      </pre>
    </>
  )
}
