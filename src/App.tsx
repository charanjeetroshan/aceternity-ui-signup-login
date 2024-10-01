import { Route, Routes, useLocation } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Navbar from "./components/custom/Navbar";
import { lazy, Suspense, useEffect } from "react";
import { useAuth } from "./hooks/useAuth";
import { userState } from "./contexts/UserState";
import { usePreviousLocation } from "./hooks/usePreviousLocation";
import { SpecialRoutes } from "./components/custom/SpecialRoutes";
import Loader from "./components/custom/Loader";
import Container from "./components/custom/Container";
import DeleteAccountPage from "./pages/DeleteAccountPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPassword from "./pages/ResetPassword";
import { useRecoilValue } from "recoil";

const HomePage = lazy(() => import("@/pages/HomePage"));
const SignInPage = lazy(() => import("@/pages/SignInPage"));
const SignUpPage = lazy(() => import("@/pages/SignUpPage"));
const UserProfile = lazy(() => import("@/pages/UserProfile"));
const VerifyEmail = lazy(() => import("@/pages/VerifyEmail"));

function App() {
   const { getCurrentUser, isLoading } = useAuth();
   const previousLocation = usePreviousLocation();
   const location = useLocation();
   const user = useRecoilValue(userState);

   useEffect(() => {
      (async () => {
         await getCurrentUser();
      })();
   }, [getCurrentUser]);

   useEffect(() => {
      if (
         user &&
         (location.pathname.endsWith("/sign-in") ||
            location.pathname.endsWith("/sign-up")) &&
         !previousLocation.endsWith("/sign-in") &&
         !previousLocation.endsWith("/sign-up")
      ) {
         toast.success("You are already logged in.", { duration: 1000 });
      }
   }, [location.pathname, previousLocation, user]);

   useEffect(() => {
      if (
         !user &&
         (location.pathname.endsWith("/user-profile") ||
            location.pathname.endsWith("/delete-account")) &&
         (previousLocation.endsWith("/") ||
            previousLocation.endsWith("/sign-in") ||
            previousLocation.endsWith("/sign-up") ||
            previousLocation.endsWith("/forgot-password"))
      ) {
         toast.error("You need to sign in first.", { duration: 1500 });
      }
   }, [location.pathname, previousLocation, user]);

   if (isLoading) {
      return (
         <Container>
            <Loader size="large" />
         </Container>
      );
   }

   return (
      <>
         <Navbar className="font-semibold" />
         <Suspense
            fallback={
               <Container>
                  <Loader size="large" />
               </Container>
            }>
            <Routes>
               <Route path="/" element={<HomePage />} />
               <Route element={<SpecialRoutes type="PUBLIC" />}>
                  <Route path="/sign-up" element={<SignUpPage />} />
                  <Route path="/verify-email/:username" element={<VerifyEmail />} />
                  <Route path="/sign-in" element={<SignInPage />} />
                  <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                  <Route path="/reset-password" element={<ResetPassword />} />
               </Route>

               <Route element={<SpecialRoutes type="PRIVATE" />}>
                  <Route path="/user-profile" element={<UserProfile />} />
                  <Route path="/delete-account" element={<DeleteAccountPage />} />
               </Route>
            </Routes>
            <Toaster position="bottom-center" containerClassName="text-center" />
         </Suspense>
      </>
   );
}

export default App;
