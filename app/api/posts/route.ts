import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { Post } from "@/app/lib/definitions";

export async function GET() {
  const session = await getServerSession(authOptions);
  const posts = await sql<Post>`SELECT * FROM post;`;
  return NextResponse.json(posts.rows);
}
