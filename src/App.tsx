import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/home/Home';
import OAuthSuccess from './components/home/auth/OAuthSuccess';
import HomeLayout from './components/home/HomeLayout';
import LoginPage from './components/home/auth/LoginPage';
import Dashboard from './components/dashboard/Dashboard';
import ProtectedRoutes from './components/routeWrappers/ProtectedRoutes';
import UnProtectedRoutes from './components/routeWrappers/UnProtectedRoutes';
import NotFound from './components/utils/NotFound';

const App = () => {

	return (
		<div className='w-screen min-h-screen flex overflow-x-hidden'>
			<div className='flex-1'>
				<BrowserRouter>
					<Routes>

						{/* HOME LAYOUT */}
						<Route path="/" element={<HomeLayout />}>
							{/* HOME */}
							<Route index element={<Home />} />
						</Route>

						{/* SUCCESSFULLY LOGGED IN */}
						<Route path="/oauth-redirect" element={<OAuthSuccess />} />

						{/* PROTECTED ROUTES */}
						<Route path='/' element={<ProtectedRoutes />}>

							{/* DASHBOARD */}
							<Route path='/dashboard' element={<Dashboard />}>



							</Route>

						</Route>

						{/* UNPROTECTED ROUTES */}
						<Route path='/' element={<UnProtectedRoutes />}>

							{/* LOGIN */}
							<Route path="/login" element={<LoginPage />} />

						</Route>

						{/* NOT FOUND */}
						<Route path="*" element={<NotFound />} />
					</Routes>


				</BrowserRouter>
			</div>
		</div>
	)
}

export default App
