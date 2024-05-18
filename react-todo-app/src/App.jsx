import { Route, Routes } from 'react-router-dom';
import AuthProvider from './Components/AuthProvider';
import PrivateRoute from './Components/PrivateRoute';

import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';
import HomePage from './Pages/HomePage';
import Profile from './Pages/Profile';
import Register from './Pages/Register';
import OutWebSite from './Pages/Advertiser WebSite';

function App() {
  return (
    <>
      <div className='App'>
        <AuthProvider>
          <Routes>
            <Route index element={<HomePage />} />
            <Route path="/singin" element={<Login />} />
            <Route path="/singup" element={<Register/>} />
            <Route element={<PrivateRoute />} >
              <Route path="/Inicio" element={<Dashboard />} />
              <Route path="/Perfil" element={<Profile />} />
            </Route>
            <Route path='/Website' element={<OutWebSite/>}/>
          </Routes>
        </AuthProvider>
      </div>
    </>
  );
}

export default App;
