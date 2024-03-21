import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { VerifySession } from './middleware/VerifySession';
import { UserProvider } from './context/UserProvider';

function App() {

  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<VerifySession />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  )
}

export default App
