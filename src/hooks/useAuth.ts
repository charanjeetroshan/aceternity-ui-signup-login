import { APIResponse, SignInUser } from "@/types";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useCallback, useState } from "react";

export function useAuth() {
   const [isLoading, setIsLoading] = useState(false);
   const baseAPIURL = "http://localhost:8000/api/v1/users";

   const signInUser = async (user: SignInUser) => {
      setIsLoading(true);

      let response: AxiosResponse<APIResponse> | undefined;
      let errors: AxiosError<APIResponse> | undefined;

      try {
         response = await axios.post<APIResponse>(`${baseAPIURL}/login`, user, {
            withCredentials: true,
         });
      } catch (error) {
         console.error(error);
         errors = error as AxiosError<APIResponse>;
      } finally {
         setIsLoading(false);
      }

      return { response, errors };
   };

   const signOutUser = useCallback(async () => {
      setIsLoading(true);

      let response: AxiosResponse<APIResponse> | undefined;
      let errors: AxiosError<APIResponse> | undefined;

      try {
         response = await axios.get<APIResponse>(`${baseAPIURL}/logout`, {
            withCredentials: true,
         });
      } catch (error) {
         console.error(error);
         errors = error as AxiosError<APIResponse>;
      } finally {
         setIsLoading(false);
      }

      return { response, errors };
   }, []);

   const getCurrentUser = useCallback(async () => {
      setIsLoading(true);

      let response: AxiosResponse<APIResponse> | undefined;
      let errors: AxiosError<APIResponse> | undefined;

      try {
         response = await axios.get<APIResponse>(`${baseAPIURL}/current-user`, {
            withCredentials: true,
         });
      } catch (error) {
         console.error(error);
         errors = error as AxiosError<APIResponse>;
      } finally {
         setIsLoading(false);
      }

      return { response, errors };
   }, []);

   return {
      isLoading,
      signInUser,
      getCurrentUser,
      logoutUser: signOutUser,
   };
}
