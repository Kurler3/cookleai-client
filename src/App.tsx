import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/home/Home';
import OAuthSuccess from './components/home/auth/OAuthSuccess';
import HomeLayout from './components/home/HomeLayout';
import LoginPage from './components/home/auth/LoginPage';
import Dashboard from './components/dashboard/Dashboard';

const App = () => {

  return (
    <div className='w-screen min-h-screen flex overflow-x-hidden'>
      <div className='flex-1'>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomeLayout />}>
              {/* HOME */}
              <Route index element={<Home />} />
            </Route>

            {/* LOGIN */}
            <Route path="/login" element={<LoginPage />} />
            {/* SUCCESSFULLY LOGGED IN */}
            <Route path="/oauth-redirect" element={<OAuthSuccess />} />

            {/* DASHBOARD */}
            <Route path='/dashboard' element={<Dashboard />}>

            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  )
}

export default App
