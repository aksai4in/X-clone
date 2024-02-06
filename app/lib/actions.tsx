"use server";

import { sql } from "@vercel/postgres";
import { signIn } from "next-auth/react";

export async function existsUserWithEmail(email: string) {
  const user = await sql`SELECT * FROM users WHERE email = ${email}`;
  if (user) {
    return true;
  } else {
    return false;
  }
}
