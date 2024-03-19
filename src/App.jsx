import { Landing } from './pages/Landing';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Login } from './pages/Login';
import Users from './pages/admin/Users';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<Landing />} />
          <Route path='/admin/users' element={<Users />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
