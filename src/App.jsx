import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/home_page/HomePage'
import RegisterPage from './pages/register_page/RegisterPage';
import TopNavbar from "./components/navbars/TopNavbar";
import LoginPage from './pages/login_page/LoginPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserProvider } from './contexts/UserContext';
import ProtectedRoute from './components/routes/ProtectedRoute';

function App() {
  return (
    <Router>
      <UserProvider>
        <TopNavbar />
        <ToastContainer />
          <Routes>
            <Route 
              path="/" 
              element={<HomePage />}
             />
            <Route 
              path="/register" 
              element={<ProtectedRoute only_unauthenticated><RegisterPage /></ProtectedRoute>} 
            />
            <Route 
              path="/login" 
              element={<ProtectedRoute only_unauthenticated><LoginPage/></ProtectedRoute>} 
            />
          </Routes>
      </UserProvider>
    </Router>
  )
}

export default App;
