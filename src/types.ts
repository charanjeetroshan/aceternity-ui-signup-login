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

export type SignUpUser = Pick<User, "fullName" | "username" | "email" | "password">;

export type SignInUser = {
   password: string;
} & ({ username?: string } | { email?: string });

export type APIResponse = {
   statusCode: number;
   data?: {
      user: User;
   };
   message: string;
   success: boolean;
};

export type DisplayUser = Pick<User, "fullName" | "username" | "email" | "isVerified">;

export type DeleteUserAccount = Pick<User, "password">;

export type ForgotPasswordUser = Pick<User, "email">;
export type ResetPasswordUser = Pick<User, "username"> & {
   resetPasswordOTP: string;
   newPassword: string;
   confirmNewPassword: string;
};
