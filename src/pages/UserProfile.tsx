import Container from "@/components/custom/Container";
import {
   Card,
   CardSkeletonContainer,
   Skeleton,
   CardTitle,
   CardDescription,
} from "@/components/ui/card";
import { userState } from "@/contexts/UserState";
import { useRecoilValue } from "recoil";
import { DisplayUser } from "@/types";
import Button from "@/components/custom/Button";
import usePageVisibility from "@/hooks/usePageVisibility";
import { useAuth } from "@/hooks/useAuth";
import Loader from "@/components/custom/Loader";

function UserProfile() {
   const user = useRecoilValue(userState);
   const { isLoading, getCurrentUser, signOutUser } = useAuth();
   const displayUser: DisplayUser | undefined = user;

   usePageVisibility(getCurrentUser);

   const handleClick = async () => {
      await signOutUser();
   };

   if (isLoading) {
      return (
         <Container>
            <Loader size="large" />
         </Container>
      );
   }

   if (!displayUser) {
      return <Container className="text-neutral-200">You are not logged in.</Container>;
   }

   return (
      <Container>
         <div className="w-[400px] max-w-full mx-auto text-center">
            <Card className="text-center mb-8 space-y-3">
               <CardSkeletonContainer>
                  <Skeleton />
               </CardSkeletonContainer>
               <CardTitle>Hello {displayUser.fullName}</CardTitle>
               <CardDescription className="whitespace-pre-wrap text-left">
                  {`{
      "FullName": "${displayUser.fullName}",
      "Email": "${displayUser.email}",
      "Username": "${displayUser.username}",
      "IsVerified": "${displayUser.isVerified}"
}`}
               </CardDescription>
            </Card>
            <Button variant="filled" onClick={handleClick} className="w-[98%] rounded-xl">
               Logout
            </Button>
         </div>
      </Container>
   );
}

export default UserProfile;
