import { BrowserRouter as Router , Routes, Route } from "react-router-dom";
import LandingPage from "./LandingPage";
import MissingPage from "./MissingPage";
const App=()=>{
  return(
    <div className="w-full h-full flex items-center justify-center">
      <Router>
        <Routes>
          <Route path="*" element={<MissingPage/>}></Route>
          <Route path="/" element={<LandingPage/>}></Route>
          <Route path="/home" element={<LandingPage/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}
export default App;