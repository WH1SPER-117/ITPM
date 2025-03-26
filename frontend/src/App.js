// //import logo from './logo.svg';
// import './App.css';
// import Home from './Components/Home/Home';

// function App() {
//   return (
//     <div className="App">
//       <div>
//         <Home></Home>
//       </div>
//     </div>
//   );
// }

// export default App;

import { Routes, Route } from "react-router-dom"
import Header from "./Components/Home/Header"
import Home from "./Components/Home/Home"
import Footer from "./Components/Home/Footer"
import "./App.css"

//Service Provider Routes 
import Test from "./Components/ServiceProvider/Test";
import ServiceProviderSignUp from "./Components/ServiceProvider/ServiceProviderSignUp";
import ServiceProviderLogin from "./Components/ServiceProvider/ServiceProviderLogin"
import ServiceProviderProfile from "./Components/ServiceProvider/ServiceProviderProfile"
import AdminDashboard from "./Components/ServiceProvider/AdminDashboard"
import ApproveServiceProviders from "./Components/ServiceProvider/ApproveServiceProviders"

function App() {
  return (
    <div className="flex min-h-screen flex-col">
      
      <Routes>
        <Route path="/" element={<Home/>} />
        {/* Add more routes as needed */}
        <Route path="/Test" element={<Test/>} />
        <Route path="/ServiceProviderSignUp" element={<ServiceProviderSignUp/>} />
        <Route path="/ServiceProviderLogin" element={<ServiceProviderLogin/>} />
        <Route path="/ServiceProviderProfile" element={<ServiceProviderProfile/>} />
        <Route path="/AdminDashboard" element={<AdminDashboard/>} />
        <Route path="/ApproveServiceProviders" element={<ApproveServiceProviders/>} />
      </Routes>
      
    </div>
  )
}

export default App

