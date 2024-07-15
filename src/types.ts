export type SignupUser = {
   fullName: string;
   username: string;
   email: string;
   password: string;
};

export type APIResponse = {
   statusCode: number;
   data?: Record<string, unknown>;
   message: string;
   success: boolean;
};
