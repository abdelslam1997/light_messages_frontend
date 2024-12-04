import { NavigationProvider } from './contexts/NavigationContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/home_page/HomePage'
import RegisterPage from './pages/register_page/RegisterPage';
import TopNavbar from "./components/navbars/TopNavbar";
import LoginPage from './pages/login_page/LoginPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <TopNavbar />
      <ToastContainer />
      <NavigationProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </NavigationProvider>
    </Router>
  )
}

export default App;
