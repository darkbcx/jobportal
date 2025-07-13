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
          throw new Error("No credentials provided");
        }

        const user = await getUserByEmail(credentials.email as string);
        if(!user) {
          throw new Error("User not found");
        }

        const hashedPassword = crypto.createHash("md5").update(credentials.password as string).digest("hex");
        if (user.password_hash !== hashedPassword) {
          throw new Error("Invalid password");
        }

        return user;
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
      }
      return token;
    }
  }
});
