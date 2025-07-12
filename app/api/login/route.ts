import { getUserByEmail } from "@/actions/user";
import crypto from "crypto";
import { signIn } from "@/auth";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const user = await getUserByEmail(email);
  if (!user) {
    return Response.json({ error: "User not found" }, { status: 401 });
  }

  const hashedPassword = crypto.createHash("md5").update(password).digest("hex");
  if (user.password_hash !== hashedPassword) {
    return Response.json({ error: "Invalid password" }, { status: 401 });
  }

  // perform login via Auth.js internal logic
  try {
    const response = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (response?.error) {
      return Response.json({ error: response.error }, { status: 401 });
    }

    return Response.json({ ok: true });
  } catch (err) {
    console.error("Login error:", err);
    return Response.json({ error: "Internal error" }, { status: 500 });
  }
}
