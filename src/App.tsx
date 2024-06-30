import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/home/Home';
import OAuthSuccess from './components/home/auth/OAuthSuccess';
import HomeLayout from './components/home/HomeLayout';
import LoginPage from './components/home/auth/LoginPage';
import { Box } from '@chakra-ui/react';

const App = () => {

  return (
    <Box>

    <BrowserRouter>
      <Routes>

        <Route path="/" element={<HomeLayout />}>
          
          {/* HOME */}
          <Route path="/" element={<Home />} />

          {/* LOGIN */}
          <Route path='/login' element={<LoginPage />} />
        </Route>

        {/* SUCCESSFULLY LOGGED IN */}
        <Route path="/oauth" element={<OAuthSuccess />} />
      </Routes>
    </BrowserRouter>
    </Box>
  )
}

export default App
