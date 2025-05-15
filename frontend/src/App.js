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
import "./App.css";

//Service Category Routes
import ServiceCategories from "./Components/ServiceCatalog/ServiceCategories"
import AddCategory from "./Components/ServiceCatalog/AddCategory"
import RequestServiceForm from "./Components/ServiceCatalog/RequestServiceForm";
import UserManagement from "./Components/User/UserManagement";



function App() {
  return (
    <><div className="flex min-h-screen flex-col">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ServiceCategories" element={<ServiceCategories />} />
        <Route path="/AddCategory" element={<AddCategory />} />
        <Route path="/RequestService" element={<RequestServiceForm/>} />
        <Route path="/UserManagement" element={<UserManagement />} />
        <Route path="/customer-details/:categoryId" element={<CustomerDetailsForm />} />
        {/* Add more routes as needed */}
      </Routes>
      <Footer />
    </div><div className="min-h-screen bg-lightBlue flex flex-col items-center p-6">
        <h1 className="text-3xl font-bold text-primary mb-6">Service Catalog</h1>
        <AddCategory />
        <ServiceCategories />
      </div></>
  );

}

export default App;

