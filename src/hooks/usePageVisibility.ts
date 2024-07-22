import { useEffect } from "react";

const usePageVisibility = (onVisible: () => void) => {
   useEffect(() => {
      const handleVisibilityChange = () => {
         if (document.visibilityState === "visible") {
            onVisible();
         }
      };

      document.addEventListener("visibilitychange", handleVisibilityChange);

      return () => {
         document.removeEventListener("visibilitychange", handleVisibilityChange);
      };
   }, [onVisible]);
};

export default usePageVisibility;