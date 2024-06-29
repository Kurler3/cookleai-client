import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import OAuthSuccess from './components/auth/OAuthSuccess';

const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/oauth" element={<OAuthSuccess />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
