"use server";

import { sql } from "@vercel/postgres";
import { signIn } from "next-auth/react";
import { Post, PostUser } from "./definitions";
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
      await sql<Post>`SELECT * FROM post, users WHERE post.username = users.username and reply_post_id is NULL ORDER BY Created_at desc;`;
    return posts.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch revenue data.");
  }
  //   await new Promise((resolve) => setTimeout(resolve, 2000));
}
export async function getPost(post_id: string): Promise<any[]> {
  try {
    const post =
      await sql<any>`SELECT * FROM post, users WHERE post_id=${post_id} and post.username = users.username;`;
    return post.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch revenue data.");
  }
  //   await new Promise((resolve) => setTimeout(resolve, 2000));
}
export async function getReplies(post_id: string): Promise<any[]> {
  try {
    const post =
      await sql<any>`SELECT * FROM post, users WHERE reply_post_id=${post_id} and post.username = users.username;`;
    return post.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch revenue data.");
  }
  //   await new Promise((resolve) => setTimeout(resolve, 2000));
}

const Post = z.object({
  content: z.string().min(1),
  username: z.string().min(1),
});

export type PostFromState = {
  errors?: {
    content?: string[];
    username?: string[];
  };
  message?: string | null;
};

export async function createPost(prevState: PostFromState, formData: FormData) {
  console.log(formData.get("username") as string);
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
    }, ${
      formData.get("username") as string
    }, ARRAY[${url}]) RETURNING post_id ;`;
  const post_id = result.rows[0].post_id;
  if (url != null) {
    await sql`INSERT INTO media (post_id, link) VALUES (${post_id}, ${url})`;
  }
  revalidatePath("/home");
  redirect("/home");
}
export async function createReply(
  prevState: PostFromState,
  formData: FormData
) {
  console.log(formData.get("username") as string);
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
    await sql<Post>`INSERT INTO post (content, username, medialinks, reply_post_id) VALUES (${
      formData.get("content") as string
    }, ${formData.get("username") as string}, ARRAY[${url}], ${
      formData.get("post_id") as string
    }) RETURNING post_id ;`;
  const post_id = result.rows[0].post_id;
  if (url != null) {
    await sql`INSERT INTO media (post_id, link) VALUES (${post_id}, ${url})`;
  }
  revalidatePath("/home");
  redirect("/home");
}

export async function getUserByEmail(email: string) {
  const user = await sql`SELECT username FROM users WHERE email = ${email}`;
  return user.rows[0].username;
}
