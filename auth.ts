import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { getUserByEmail } from "./actions/user";
import crypto from "crypto";

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
});
