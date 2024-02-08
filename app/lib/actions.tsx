"use server";

import { sql } from "@vercel/postgres";
import { signIn } from "next-auth/react";
import { Post } from "./definitions";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function existsUserWithEmail(email: string) {
  const user = await sql`SELECT * FROM users WHERE email = ${email}`;
  if (user) {
    return true;
  } else {
    return false;
  }
}

export async function fetchPosts(): Promise<Post[]> {
  try {
    const posts =
      await sql<Post>`SELECT * FROM post, users WHERE post.username = users.username ORDER BY Created_at desc;`;
    return posts.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch revenue data.");
  }
  //   await new Promise((resolve) => setTimeout(resolve, 2000));
}

export async function createPost(prevState: any, formData: FormData) {
  const result = await sql<Post>`INSERT INTO post (content, username) VALUES (${
    formData.get("content") as string
  }, 'aksai4in');`;
  revalidatePath("/home");
  redirect("/home");
}
