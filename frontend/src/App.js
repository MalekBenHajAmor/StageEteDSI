import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Header from './Components/Header';
import Contact from './Components/Contact';
import SignUp from './Components/Sign_up'; // Updated import
import Home from './Components/Home';
import SignIn from './Components/Sign-in'; // Updated import
import BackOffice from './Components/BackOffice'; // Updated import

import { UserProvider, useUser } from './Components/UserContext'; // Updated import

// Create a PrivateRoute component to handle route protection
const PrivateRoute = ({ element }) => {
  const { currentUser } = useUser(); // Access user context
  return currentUser ? element : <Navigate to="/sign_in" />;
};

function App() {
  return (
    <UserProvider>
      <div className="App">
        <Router>
          <Navbar />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<><Header /><Home /><Contact /></>} />
            <Route path="/sign_up" element={<SignUp />} />
            <Route path="/sign_in" element={<SignIn />} />
            <Route path="/BackOffice" element={<PrivateRoute element={<BackOffice />} />} />
          </Routes>
        </Router>
      </div>
    </UserProvider>
  );
}

export default App;
