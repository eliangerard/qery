import { useState } from 'react'
import { useGoogleLogin } from '@react-oauth/google';

export const Login = () => {
  const [user, setUser] = useState(null);

  const login = useGoogleLogin({
    onSuccess: async tokenResponse => {
      const userResponse = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: {
          Authorization: `Bearer ${tokenResponse.access_token}`,
        },
      });
      const user = await userResponse.json();
      
      fetch("http://192.168.110.225:3000/users/", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: user.email,
          companyName: user.name,
          picture: user.picture,
        }),
      });

      setUser(user);
    
    },
    scope: 'profile email',
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
