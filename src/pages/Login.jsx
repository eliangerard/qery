import { useState, useEffect } from 'react'
import GoogleLogin from 'react-google-login'
import { gapi } from 'gapi-script'

export const Login = () => {
  const clientID = "131255106642-pnrhidgpc4irnd8b4v8gcpkot235v60i.apps.googleusercontent.com"
  const [user, setUser] = useState(null);

  useEffect(() => {

    gapi.load('auth2', () => {
      const auth2 = gapi.auth2.init({
        client_id: clientID
      })
      auth2.attachClickHandler(document.getElementById('google-login'), {}, (googleUser) => {
        console.log(googleUser)
      }, (error) => {
        console.log(error)
      })
    })
  }, [])

  const handleSuccess = (response) => {
    setUser(response.profileObj);
    console.log(response);
  }

  const handleFailure = (response) => {
    console.log(response);
  }

  return (
    <>
      <GoogleLogin
        clientId={clientID}
        onSuccess={handleSuccess}
        onFailure={handleFailure}
        cookiePolicy={'single_host_origin'}
      />
      <pre>
        {JSON.stringify(user, null, 2)}
      </pre>
    </>
  )
}
