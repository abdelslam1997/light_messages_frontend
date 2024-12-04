import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/home_page/HomePage'
import RegisterPage from './pages/register_page/RegisterPage';
import TopNavbar from "./components/navbars/TopNavbar";

function App() {

  return (
    <Router>
      <TopNavbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Router>
  )
}

export default App;
