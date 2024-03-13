import { Landing } from './pages/Landing';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Login } from './pages/Login';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<Landing />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
