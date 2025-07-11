"use server";
import employers from "@/data/mock-employer-1.json";
import { Employer } from "@/lib/types";

export async function getEmployerByUserId(
  id: string
): Promise<Employer | undefined> {
  const emp = employers.find(
    (employer) => employer.user_id === id
  ) as unknown as Employer | undefined;
  return emp;
} 