import { userState } from "@/contexts/UserState";
import { showToastMessage } from "@/lib/helpers/showToastMessage";
import {
   APIResponse,
   DeleteUserAccount,
   ForgotPasswordUser,
   ResetPasswordUser,
   SignInUser,
} from "@/types";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useCallback, useState } from "react";
import { useSetRecoilState } from "recoil";

export function useAuth() {
   const [isLoading, setIsLoading] = useState(false);
   const setUser = useSetRecoilState(userState);
   const baseAPIURL = "http://localhost:8000/api/v1/users";

   const signInUser = useCallback(
      async (user: SignInUser) => {
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

         showToastMessage(response, errors, { setUser });

         return { response, errors };
      },
      [setUser]
   );

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

      showToastMessage(response, errors, {
         isSignOut: true,
         setUser,
      });

      return { response, errors };
   }, [setUser]);

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

      if (response && response.data.success) {
         setUser(response.data.data?.user);
      }

      return { response, errors };
   }, [setUser]);

   const deleteUserAccount = useCallback(
      async (user: DeleteUserAccount) => {
         setIsLoading(true);

         let response: AxiosResponse<APIResponse> | undefined;
         let errors: AxiosError<APIResponse> | undefined;

         try {
            response = await axios.post<APIResponse>(
               `${baseAPIURL}/delete-account`,
               user,
               {
                  withCredentials: true,
               }
            );
         } catch (error) {
            console.error(error);
            errors = error as AxiosError<APIResponse>;
         } finally {
            setIsLoading(false);
         }

         showToastMessage(response, errors, { isSignOut: true, setUser });

         return { response, errors };
      },
      [setUser]
   );

   const forgotPassword = useCallback(async (user: ForgotPasswordUser) => {
      setIsLoading(true);

      let response: AxiosResponse<APIResponse> | undefined;
      let errors: AxiosError<APIResponse> | undefined;

      try {
         response = await axios.post<APIResponse>(
            `${baseAPIURL}/reset-password-otp`,
            user
         );
      } catch (error) {
         console.error(error);
         errors = error as AxiosError<APIResponse>;
      } finally {
         setIsLoading(false);
      }

      showToastMessage(response, errors);

      return { response, errors };
   }, []);

   const resetPassword = useCallback(async (user: ResetPasswordUser) => {
      setIsLoading(true);

      let response: AxiosResponse<APIResponse> | undefined;
      let errors: AxiosError<APIResponse> | undefined;

      try {
         response = await axios.post<APIResponse>(`${baseAPIURL}/reset-password`, user);
      } catch (error) {
         console.error(error);
         errors = error as AxiosError<APIResponse>;
      } finally {
         setIsLoading(false);
      }

      showToastMessage(response, errors);

      return { response, errors };
   }, []);

   return {
      isLoading,
      signInUser,
      getCurrentUser,
      signOutUser,
      deleteUserAccount,
      forgotPassword,
      resetPassword,
   };
}
