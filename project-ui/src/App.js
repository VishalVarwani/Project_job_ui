import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from './components/auth/Signup/Signup';
import Welcome from './components/Welcomepage/Welcome';
import Login from './components/auth/Login/Login';
import SignupForm from './components/auth/Signup/SignupForm';
import Demo from './components/testingfolder/demo';
import Home from './components/testingfolder/demo';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route 
        path="/" element={<Layout />}>
          <Route index element={<Home />} /> */}
          <Route path="/" element={<Welcome />} />
          <Route path="Signup" element={<Signup />} />
          <Route path="Login" element={<Login />} />
          <Route path="Signupform" element={<SignupForm />} />
          <Route path="home" element={<Home />} />


          {/* <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NoPage />} /> */}
        {/* </Route> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
