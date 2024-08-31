import { userState } from "@/contexts/UserState";
import { useRecoilValueLoadable } from "recoil";
import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import Container from "./Container";
import Loader from "./Loader";
import { DisplayUser } from "@/types";
import { usePreviousLocation } from "@/hooks/usePreviousLocation";

type SpecialRoutesProps = {
   type: "PRIVATE" | "PUBLIC";
};

export function SpecialRoutes(props: SpecialRoutesProps) {
   const { type } = props;
   const isUserLoadable = useRecoilValueLoadable(userState);
   const [isLoading, setIsLoading] = useState(true);
   const previousLocation = usePreviousLocation();

   useEffect(() => {
      if (isUserLoadable.state !== "loading") {
         setIsLoading(false);
      }
   }, [isUserLoadable.state]);

   const user: DisplayUser | undefined = isUserLoadable.contents;

   if (isLoading) {
      return (
         <Container>
            <Loader size="large" />
         </Container>
      );
   }

   if (type === "PRIVATE") {
      if (!user && previousLocation.endsWith("/delete-account")) {
         return <Navigate to="/" />;
      }

      return user ? <Outlet /> : <Navigate to="sign-in" />;
   }

   if (type === "PUBLIC") {
      return user ? <Navigate to="/user-profile" /> : <Outlet />;
   }
}
