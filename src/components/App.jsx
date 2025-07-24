import { BrowserRouter as Router , Routes, Route } from "react-router-dom";
import LandingPage from "./LandingPage";
import MissingPage from "./MissingPage";
import Navbar from "./Navbar";
const App=()=>{
  return(
    <Router>
      <Navbar/>
      <Routes>
        <Route path="*" element={<MissingPage/>}></Route>
        <Route path="/" element={<LandingPage/>}></Route>
        <Route path="/home" element={<LandingPage/>}></Route>
      </Routes>
    </Router>
  );
}
export default App;