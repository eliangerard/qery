import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { VerifySession } from './middleware/VerifySession';
import { UserProvider } from './context/UserProvider';
import { Client } from './pages/user/Client';

function App() {

  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/company/:username" element={<Client/>}/>
          <Route path="/*" element={<VerifySession />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  )
}

export default App
