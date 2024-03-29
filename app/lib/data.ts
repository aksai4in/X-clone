import { sql } from "@vercel/postgres";
import { Post } from "./definitions";

export async function fetchPosts(): Promise<Post[]> {
  try {
    // await new Promise((resolve) => setTimeout(resolve, 3000));
    const posts = await sql<Post>`SELECT * FROM post order by Created_at desc;`;
    return posts.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch revenue data.");
  }
  //   await new Promise((resolve) => setTimeout(resolve, 2000));
}
