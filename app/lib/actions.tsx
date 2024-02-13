"use server";

import { sql } from "@vercel/postgres";
import { signIn } from "next-auth/react";
import { DetailUser, Post, PostUser, User } from "./definitions";
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

export async function getPosts(username: string): Promise<Post[]> {
  try {
    const posts =
      await sql<Post>`select users.username, users.email, users.name, users.image, users.verified, temp.post_id, temp.content, temp.created_at, temp.medialinks, temp.reply_post_id, temp.like_count, temp.liked  from users, (SELECT
        post.*,
        COUNT(likes.post_id) AS like_count,
        count(case when likes.username=${username} then 1 else Null end) as liked
      FROM
        post
      LEFT JOIN
        likes ON post.post_id = likes.post_id
      WHERE post.reply_post_id is Null
      GROUP BY
        post.post_id) as temp where users.username = temp.username ORDER BY temp.created_at desc;`;
    return posts.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch revenue data.");
  }
  //   await new Promise((resolve) => setTimeout(resolve, 2000));
}
export async function getFollowingPosts(username: string): Promise<Post[]> {
  try {
    const posts =
      await sql<Post>`select users.username, users.email, users.name, users.image, users.verified, temp.post_id, temp.content, temp.created_at, temp.medialinks, temp.reply_post_id, temp.like_count, temp.liked  from users, (SELECT
        post.*,
        COUNT(likes.post_id) AS like_count,
        count(case when likes.username=${username} then 1 else Null end) as liked
      FROM
        post
      LEFT JOIN
        likes ON post.post_id = likes.post_id
      WHERE post.reply_post_id is Null
      GROUP BY
        post.post_id) as temp where users.username in (select username_2 from follows where username_1=${username}) and users.username = temp.username ORDER BY temp.created_at desc;`;
    return posts.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch revenue data.");
  }
  //   await new Promise((resolve) => setTimeout(resolve, 2000));
}

export async function getPost(username: string, post_id: number): Promise<any> {
  try {
    const posts =
      await sql<Post>`select users.username, users.email, users.name, users.image, users.verified, temp.post_id, temp.content, temp.created_at, temp.medialinks, temp.reply_post_id, temp.like_count, temp.liked  from users, (SELECT
        post.*,
        COUNT(likes.post_id) AS like_count,
        count(case when likes.username=${username} then 1 else Null end) as liked
      FROM
        post
      LEFT JOIN
        likes ON post.post_id = likes.post_id
      WHERE post.post_id=${post_id}
      GROUP BY
        post.post_id) as temp where users.username = temp.username ORDER BY temp.created_at desc;`;
    return posts.rows[0];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch revenue data.");
  }
  //   await new Promise((resolve) => setTimeout(resolve, 2000));
}

export async function getUserPosts(username: string): Promise<any[]> {
  try {
    const posts =
      await sql<any>`select users.username, users.email, users.name, users.image, users.verified, temp.post_id, temp.content, temp.created_at, temp.medialinks, temp.reply_post_id, temp.like_count, temp.liked  from users, (SELECT
        post.*,
        COUNT(likes.post_id) AS like_count,
        count(case when likes.username=${username} then 1 else Null end) as liked
      FROM
        post
      LEFT JOIN
        likes ON post.post_id = likes.post_id
      WHERE post.reply_post_id is Null
      GROUP BY
        post.post_id) as temp where users.username=${username} and users.username = temp.username ORDER BY temp.created_at desc;`;
    return posts.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch revenue data.");
  }
  //   await new Promise((resolve) => setTimeout(resolve, 2000));
}

export async function getBookmarkedPosts(username: string): Promise<any[]> {
  try {
    const posts =
      await sql<any>`select users.username, users.email, users.name, users.image, users.verified, temp.post_id, temp.content, temp.created_at, temp.medialinks, temp.reply_post_id, temp.like_count, temp.liked  from users, (SELECT
        post.*,
        COUNT(likes.post_id) AS like_count,
        count(case when likes.username=${username} then 1 else Null end) as liked
      FROM
        post
      LEFT JOIN
        likes ON post.post_id = likes.post_id
      WHERE post.post_id in (select post_id from bookmarks where username=${username})
      GROUP BY
        post.post_id) as temp where users.username = temp.username ORDER BY temp.created_at desc;`;
    return posts.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch revenue data.");
  }
}
export async function likedPosts(username: string): Promise<Post[]> {
  try {
    const posts =
      await sql<Post>`select post_id from likes where username = ${username}`;
    return posts.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch revenue data.");
  }
  //   await new Promise((resolve) => setTimeout(resolve, 2000));
}

// export async function getPost(post_id: string): Promise<any[]> {
//   try {
//     const post =
//       await sql<any>`SELECT * FROM post, users WHERE post_id=${post_id} and post.username = users.username ;`;
//     return post.rows;
//   } catch (error) {
//     console.error("Database Error:", error);
//     throw new Error("Failed to fetch revenue data.");
//   }
//   //   await new Promise((resolve) => setTimeout(resolve, 2000));
// }
export async function getReplies(
  username: string,
  post_id: number
): Promise<any[]> {
  try {
    const post =
      await sql<any>`select users.username, users.email, users.name, users.image, users.verified, temp.post_id, temp.content, temp.created_at, temp.medialinks, temp.reply_post_id, temp.like_count  from users, (SELECT
        post.*,
        COUNT(likes.post_id) AS like_count,
        count(case when likes.username=${username} then 1 else Null end) as liked
      FROM
        post
      LEFT JOIN
        likes ON post.post_id = likes.post_id
      WHERE post.reply_post_id = ${post_id}
      GROUP BY
        post.post_id) as temp where users.username = temp.username ORDER BY temp.created_at desc;`;
    return post.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch revenue data.");
  }
  //   await new Promise((resolve) => setTimeout(resolve, 2000));
}
export async function getBookmarkedPostIds(username: string) {
  try {
    const posts =
      await sql<any>`select post_id from bookmarks where username = ${username}`;

    return posts.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error(error as string);
  }
}

export async function like(username: string, post_id: string) {
  try {
    await sql`INSERT INTO likes (username, post_id) VALUES (${username}, ${post_id})`;
    return true;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error(error as string);
  }
}
export async function dislike(username: string, post_id: string) {
  try {
    await sql`DELETE from likes WHERE username=${username} and post_id=${post_id};`;
    return true;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error(error as string);
  }
}
export async function bookmark(username: string, post_id: string) {
  try {
    await sql`INSERT INTO bookmarks (username, post_id) VALUES (${username}, ${post_id})`;
    return true;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error(error as string);
  }
}
export async function unbookmark(username: string, post_id: string) {
  try {
    await sql`DELETE from bookmarks WHERE username=${username} and post_id=${post_id};`;
    return true;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error(error as string);
  }
}
export async function getLikes(post_id: string) {
  try {
    const likes =
      await sql`SELECT COUNT(*) FROM likes WHERE post_id=${post_id};`;
    return likes.rows[0];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error(error as string);
  }
}
export async function existsLike(username: string, post_id: string) {
  try {
    const likes =
      await sql`SELECT COUNT(*) FROM likes WHERE username=${username} and post_id=${post_id};`;
    if (likes.rows[0].count > 0) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error(error as string);
  }
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
    }, ARRAY[${url}]) RETURNING post_id;`;
  const post_id = result.rows[0].post_id;
  if (url != null) {
    await sql`INSERT INTO media (post_id, link) VALUES (${post_id}, ${url})`;
  }
  const post = await getPost(formData.get("username") as string, post_id);
  return post;
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
  const post = await getPost(formData.get("username") as string, post_id);
  return post;
}

export async function getUserByEmail(email: string) {
  const user = await sql`SELECT username FROM users WHERE email = ${email}`;
  return user.rows[0];
}

export async function getUser(username: string, pageusername: string) {
  const user = await sql<DetailUser>`
  SELECT u.*, 
       COUNT(f1.username_1) AS following,
       COUNT(f2.username_2) AS followers,
        CASE WHEN EXISTS (
                  SELECT 1
                  FROM follows f3
                  WHERE f3.username_1 = ${username}
                  AND f3.username_2 = ${pageusername}
               ) THEN true ELSE false END AS follows
  FROM users u
  LEFT JOIN follows f1 ON u.username = f1.username_1
  LEFT JOIN follows f2 ON u.username = f2.username_2
  WHERE u.username = ${pageusername}
  GROUP BY u.username;`;
  console.log(username, pageusername);
  return user.rows[0];
}

export async function createAccount(
  name: string,
  email: string,
  password: string,
  username: string
) {
  try {
    await sql<User>`INSERT INTO users (name, email, password, username) values (${name}, ${email}, ${password}, ${username}) `;

    return true;
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch revenue data.");
  }
}

export async function insertUsername(
  name: string,
  email: string,
  image: string,
  username: string
) {
  try {
    await sql<User>`INSERT INTO users (name, email, username, image) values (${name}, ${email}, ${username}, ${image}) `;
    return true;
  } catch (err) {
    return false;
  }
}
export async function createFollow(username: string, follow_username: string) {
  try {
    await sql<User>`INSERT INTO follows (username_1, username_2) values (${username}, ${follow_username}) `;
    return true;
  } catch (err) {
    return false;
  }
}
export async function deleteFollow(username: string, follow_username: string) {
  try {
    await sql<User>`DELETE FROM follows WHERE username_1=${username} and username_2=${follow_username}`;
    return true;
  } catch (err) {
    return false;
  }
}
export async function deletePost(post_id: string) {
  try {
    await sql<User>`DELETE FROM media WHERE post_id=${post_id}`;
    await sql<User>`DELETE FROM likes WHERE post_id=${post_id}`;
    await sql<User>`DELETE FROM post WHERE reply_post_id=${post_id}`;
    await sql<User>`DELETE FROM bookmarks WHERE post_id=${post_id}`;
    await sql<User>`DELETE FROM post WHERE post_id=${post_id}`;
    return true;
  } catch (err) {
    return false;
  }
}
