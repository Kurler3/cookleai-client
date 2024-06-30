import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/home/Home';
import OAuthSuccess from './components/home/auth/OAuthSuccess';
import HomeLayout from './components/home/HomeLayout';
import LoginPage from './components/home/auth/LoginPage';

const App = () => {

  return (
    <div className='max-w-screen'>
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
        </Routes>

      
    </BrowserRouter>
    </div >
  )
}

export default App
