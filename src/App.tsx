import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import UserProfile from "./pages/UserProfile";
import { Toaster } from "react-hot-toast";
import VerifyEmail from "./pages/VerifyEmail";
import Navbar from "./components/custom/Navbar";

function App() {
   return (
      <div className="px-4 bg-slate-950">
         <Router>
            <Navbar className="font-semibold" />
            <Routes>
               <Route path="/" element={<HomePage />} />
               <Route path="/sign-up" element={<SignUpPage />} />
               <Route path="/verify-email/:username" element={<VerifyEmail />} />
               <Route path="/sign-in" element={<SignInPage />} />
               <Route path="/user-profile" element={<UserProfile />} />
            </Routes>
         </Router>
         <Toaster position="bottom-center" containerClassName="text-center" />
      </div>
   );
}

export default App;
