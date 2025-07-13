import { UserType } from "@/lib/types";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      user_type: UserType;
      email: string;
    };
  }

  interface User {
    id: string;
    user_type: UserType;
    email: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    user_type: UserType;
  }
} 