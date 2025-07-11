"use server";
import crypto from "crypto";
import { setAuthCookie, clearAuthCookie, getAuthUser } from "@/lib/auth-utils";
import { AuthUser } from "@/lib/types";
import { getUserByEmail } from "./user";

export async function login(email: string, password: string) {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const user = await getUserByEmail(email);
  if (!user) {
    return { error: "User not found" };
  }
  
  const hashedPassword = crypto.createHash("md5").update(password).digest("hex");
  if (user.password_hash !== hashedPassword) {
    return { error: "Invalid password" };
  }

  // Set user data in cookie using utility function
  await setAuthCookie(user as unknown as AuthUser);

  return { success: true, user };
}

export async function logout() {
  await clearAuthCookie();
  return { success: true };
}

export async function getCurrentUser() {
  return await getAuthUser();
}