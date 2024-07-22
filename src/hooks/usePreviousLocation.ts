import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export function usePreviousLocation() {
   const location = useLocation();
   const [previousLocation, setPreviousLocation] = useState("");

   useEffect(() => {
      setPreviousLocation(location.pathname);
   }, [location.pathname]);

   return previousLocation;
}
