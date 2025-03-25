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

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Header from "./Components/Home/Header"
import Home from "./Components/Home/Home"
import Footer from "./Components/Home/Footer"
import "./App.css"
import ServiceCategories from "./Components/Service Catalog/ServiceCategories"
import AddCategory from "./Components/Service Catalog/AddCategory"


function App() {
  return (
   <Router> 
    <div className="flex min-h-screen flex-col">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Add more routes as needed */}
      </Routes>
      <Footer />
    </div>
   
    <div className="min-h-screen bg-lightBlue flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold text-primary mb-6">Service Catalog</h1>
      <AddCategory />
      <ServiceCategories />
    </div>
    </Router> 
  );

}

export default App

