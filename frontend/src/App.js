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

import {Routes, Route } from "react-router-dom"
import Header from "./Components/Home/Header"
import Home from "./Components/Home/Home"
import Footer from "./Components/Home/Footer"
import "./App.css"
import ServiceCategories from "./Components/ServiceCatalog/ServiceCategories"
import AddCategory from "./Components/ServiceCatalog/AddCategory"
import UserManagement from "./Components/User/UserManagement"


function App() {
  return (
    <div className="flex min-h-screen flex-col">
      
    <Routes>
      
      <Route path="/" element={<UserManagement/>} />
      <Route path="/" element={<ServiceCategories/>} />
      <Route path="/" element={<AddCategory/>} /> 


    </Routes>
    
  </div>
    
   
    
  );

}

export default App

