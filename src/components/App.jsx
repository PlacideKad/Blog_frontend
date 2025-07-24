import { BrowserRouter as Router , Routes, Route } from "react-router-dom";
import LandingPage from "./LandingPage";
import MissingPage from "./MissingPage";
import ArticlesPage from "./ArticlesPage";
import AboutPage from "./AboutPage";
import AdminDashboard from "./AdminDashboard";

import Navbar from "./Navbar";
const App=()=>{
  return(
    <Router>
      <Navbar/>
      <Routes>
        <Route path="*" element={<MissingPage/>}></Route>
        <Route path="/" element={<LandingPage/>}></Route>
        <Route path="/home" element={<LandingPage/>}></Route>
        <Route path="/articles" element={<ArticlesPage/>}></Route>
        <Route path="/dashboard" element={<AdminDashboard/>}></Route>
        <Route path="/about" element={<AboutPage/>}></Route>
      </Routes>
    </Router>
  );
}
export default App;