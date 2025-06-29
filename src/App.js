import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '././Page/Home';
import Group from './Page/Group';
import LeaderBoard from './Page/LeaderBoard';
import Profile from './Page/Profile';
import Signup from './Page/Signup';
import Login from './Page/Login';
import RabbitRelease from './Page/Rabbitrelease';
import SwipeScreen from './Components/SwipeScreen';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SwipeScreen />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/group" element={<Group />} />
        <Route path="/leaderboard" element={<LeaderBoard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/rabbit-release" element={<RabbitRelease />} />
      </Routes>
    </Router>
  );
}

export default App;
