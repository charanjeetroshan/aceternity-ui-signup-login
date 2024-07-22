import { userState } from "@/contexts/UserState";
import { useRecoilValueLoadable } from "recoil";
import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import Container from "./Container";
import Loader from "./Loader";

type SpecialRoutesProps = {
   type: "PRIVATE" | "PUBLIC";
};

export function SpecialRoutes(props: SpecialRoutesProps) {
   const { type } = props;
   const isUserLoadable = useRecoilValueLoadable(userState);
   const [isLoading, setIsLoading] = useState(true);

   useEffect(() => {
      if (isUserLoadable.state !== "loading") {
         setIsLoading(false);
      }
   }, [isUserLoadable.state]);

   const user = isUserLoadable.contents;

   if (isLoading) {
      return (
         <Container>
            <Loader size="large" />
         </Container>
      );
   }

   if (type === "PRIVATE") {
      return user ? <Outlet /> : <Navigate to="sign-in" />;
   }

   if (type === "PUBLIC") {
      return user ? <Navigate to="/user-profile" /> : <Outlet />;
   }
}
