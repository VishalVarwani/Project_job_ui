import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from './components/auth/Signup/Signup';
import Welcome from './components/Welcomepage/Welcome';
import Login from './components/auth/Login/Login';
import SignupForm from './components/auth/Signup/SignupForm';
import Home from './components/home/Home';
import Demo from './components/testfolder/demo';
import JobResults from './components/testfolder/jobresultsdemo';


function App() {
  return (
    <BrowserRouter>

      <Routes>
        {/* <Route 
        path="/" element={<Layout />}>
          <Route index element={<Home />} /> */}
          <Route path="home" element={<Welcome />} />
          {/* <Route path="/" element={<Signup />} /> */}
          <Route path="Login" element={<Login />} />
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/" element={<Demo />} />
          <Route path="jobresults" element={<JobResults />} />




          






          {/* <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NoPage />} /> */}
        {/* </Route> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
