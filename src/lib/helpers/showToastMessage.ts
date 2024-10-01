import { APIResponse, User } from "@/types";
import { AxiosError, AxiosResponse } from "axios";
import toast from "react-hot-toast";
import { SetterOrUpdater } from "recoil";

type CredentialsParams = {
   isSignOut?: boolean;
   setUser: SetterOrUpdater<User | undefined>;
};

export function showToastMessage(
   response?: AxiosResponse<APIResponse>,
   errors?: AxiosError<APIResponse>,
   options?: CredentialsParams
) {
   if (response && response.data.success) {
      toast.success(response.data.message);

      if (options) {
         const { isSignOut = false, setUser } = options;
         console.log("isSignOut", isSignOut);

         if (isSignOut) {
            setUser(undefined);
         } else {
            setUser(response.data.data?.user);
         }
      }
   }

   if (errors && errors.response) {
      toast.error(errors.response.data.message);
   } else if (errors) {
      toast.error(errors.message);
   }
}
