"use server";
import users from "@/data/mock-users-1.json";
import { User } from "@/lib/types";

export async function getUserByEmail(email: string): Promise<User | undefined> {
  const user = users.find((user) => user.email === email);
  return user as unknown as User | undefined;
}