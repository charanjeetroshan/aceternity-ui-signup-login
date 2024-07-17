export type SignupUser = {
   fullName: string;
   username: string;
   email: string;
   password: string;
};

export type APIResponse = {
   statusCode: number;
   data?: {
      user: User;
   };
   message: string;
   success: boolean;
};

export type User = {
   username: string;
   email: string;
   password: string;
   fullName: string;
   verificationCode: string;
   verificationCodeExpiration: Date;
   isVerified: boolean;
   resetPasswordToken: string | null;
   resetPasswordTokenExpiration: Date | null;
};
