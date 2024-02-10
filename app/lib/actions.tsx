"use server";

import { sql } from "@vercel/postgres";
import { signIn } from "next-auth/react";
import { Post } from "./definitions";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { storage } from "./firebase";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
import { get } from "http";

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

const Post = z.object({
  content: z.string(),
  email: z.string(),
});

export async function createPost(prevState: any, formData: FormData) {
  console.log(formData.get("uploadImage"));
  let url: string | null = null;
  if (
    formData.get("uploadImage") !== null &&
    (formData.get("uploadImage") as File).size > 0
  ) {
    const date = new Date();
    const imageRef = ref(storage, `images/media/${date.getTime()}`);
    const snapshot = await uploadBytesResumable(
      imageRef,
      formData.get("uploadImage") as Blob
    );
    url = await getDownloadURL(snapshot.ref);
  }
  const result =
    await sql<Post>`INSERT INTO post (content, username, medialinks) VALUES (${
      formData.get("content") as string
    }, 'aksai4in', ARRAY[${url}]) RETURNING post_id ;`;
  const post_id = result.rows[0].post_id;
  if (url != null) {
    await sql`INSERT INTO media (post_id, link) VALUES (${post_id}, ${url})`;
  }
  revalidatePath("/home");
  redirect("/home");
}
