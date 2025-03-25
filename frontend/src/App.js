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

function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Add more routes as needed */}
      </Routes>
      <Footer />

    </div>
  )
}

export default App

