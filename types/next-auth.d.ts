import { UserType } from "@/lib/types";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      user_type: UserType;
      email: string;
      created_at: Date;
      updated_at: Date;
      is_active: boolean;
      last_login: Date;
    };
  }

  interface User {
    id: string;
    user_type: UserType;
    email: string;
    created_at: Date;
    updated_at: Date;
    is_active: boolean;
    last_login: Date;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    user_type: UserType;
    created_at: Date;
    updated_at: Date;
    is_active: boolean;
    last_login: Date;
  }
} 