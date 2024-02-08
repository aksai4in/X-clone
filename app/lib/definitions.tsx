import { DateTime } from "next-auth/providers/kakao";

export type User = {
  username: string;
  name: string;
  email: string;
  image: string;
  password: string;
  date_of_birth: string;
  date_of_joinign: string;
};

export type Post = {
  post_id: number;
  username: string;
  content: string;
  created_at: DateTime;
};
