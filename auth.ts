import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { getUserByEmail } from "./actions/user";
import crypto from "crypto";
import { User, UserType } from "./lib/types";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if(!credentials) {
          return null;
        }

        const user = await getUserByEmail(credentials.email as string);
        if(!user) {
          return null;
        }

        const hashedPassword = crypto.createHash("md5").update(credentials.password as string).digest("hex");
        if (user.password_hash !== hashedPassword) {
          return null;
        }

        // Convert to NextAuth User format, ensuring last_login is always a Date
        return {
          ...user,
          last_login: user.last_login || new Date()
        };
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.user_type = token.user_type as UserType;
      }  
      return session;
    },
  
    async jwt({ token, user }) {
      const _user:User = user as User;
      // Persist custom user fields to the token
      if (user) {
        token.id = _user.id;
        token.user_type = _user.user_type;
        token.created_at = _user.created_at;
        token.updated_at = _user.updated_at;
        token.is_active = _user.is_active;
        token.last_login = _user.last_login;
      }
      return token;
    }
  }
});
