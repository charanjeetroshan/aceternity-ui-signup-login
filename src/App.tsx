import { Route, Routes, useLocation } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Navbar from "./components/custom/Navbar";
import { lazy, Suspense, useEffect } from "react";
import { useAuth } from "./hooks/useAuth";
import { useRecoilState } from "recoil";
import { userState } from "./contexts/UserState";
import { usePreviousLocation } from "./hooks/usePreviousLocation";
import { SpecialRoutes } from "./components/custom/SpecialRoutes";
import Loader from "./components/custom/Loader";
import Container from "./components/custom/Container";

const HomePage = lazy(() => import("@/pages/HomePage"));
const SignInPage = lazy(() => import("@/pages/SignInPage"));
const SignUpPage = lazy(() => import("@/pages/SignUpPage"));
const UserProfile = lazy(() => import("@/pages/UserProfile"));
const VerifyEmail = lazy(() => import("@/pages/VerifyEmail"));

function App() {
   const { getCurrentUser } = useAuth();
   const previousLocation = usePreviousLocation();
   const location = useLocation();
   const [user, setUser] = useRecoilState(userState);

   useEffect(() => {
      (async () => {
         const { response } = await getCurrentUser();

         if (response && response.data.success) {
            setUser(response.data.data?.user);
         }
      })();
   }, [getCurrentUser, setUser]);

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
         location.pathname.endsWith("/user-profile") &&
         (previousLocation.endsWith("/") ||
            previousLocation.endsWith("/sign-in") ||
            previousLocation.endsWith("/sign-up"))
      ) {
         toast.error("You need to sign in first.", { duration: 1500 });
      }
   }, [location.pathname, previousLocation, user]);

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
               </Route>

               <Route element={<SpecialRoutes type="PRIVATE" />}>
                  <Route path="/user-profile" element={<UserProfile />} />
               </Route>
            </Routes>
            <Toaster position="bottom-center" containerClassName="text-center" />
         </Suspense>
      </>
   );
}

export default App;
