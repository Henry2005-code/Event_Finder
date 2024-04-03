import logo from './logo.svg';
import './App.css';
import LoginPage from './Pages/LoginPage';
import SignUp from './Pages/SignUp';
import Dashboard from './Pages/Dashboard';
import {BrowserRouter as Router, Route, Switch, Routes, BrowserRouter} from 'react-router-dom';
import Layout from './Components/Layout';
import Postings from './Pages/Postings';
import StudentsMyEvents from './Pages/StudentsAvailableEvents';
import StudentsOrganizations from './Pages/StudentsOrganizations';
import MyEvents from './Pages/StudentsMyEvents';
import OurEvents from './Pages/OurEvents';
import CreateEventForm from './Pages/CreateEvent';
import OrganizationDashboard from './Pages/Dashboard';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<SignUp/>} />
      <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
      <Route path="/postings"  element={<Layout><Postings/></Layout>} />
      <Route path="/students-available-events" element={<Layout><StudentsMyEvents /></Layout>} />
      <Route path="/students-organizations" element={<Layout><StudentsOrganizations /></Layout>} />
      <Route path="/my-events" element={<Layout><MyEvents /></Layout>} />
      <Route path="/our-events" element={<Layout><OurEvents /></Layout>} />
      <Route path="/create-event" element={<Layout><CreateEventForm /></Layout>} />
      <Route path="/organization-dashboard" element={<Layout><OrganizationDashboard /></Layout>} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;