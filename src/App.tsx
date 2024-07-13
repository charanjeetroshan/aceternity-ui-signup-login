import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import { SignupPage } from "./pages/SignupPage";
import UserProfile from "./pages/UserProfile";

function App() {
   return (
      <div className="px-4 bg-slate-950">
         <Router>
            <Routes>
               <Route path="/" element={<HomePage />} />
               <Route path="/sign-up" element={<SignupPage />} />
               <Route path="/sign-in" element={<LoginPage />} />
               <Route path="/user-profile" element={<UserProfile />} />
            </Routes>
         </Router>
      </div>
   );
}

export default App;
