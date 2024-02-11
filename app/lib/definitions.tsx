import { DateTime } from "next-auth/providers/kakao";

export type User = {
  username: string;
  name: string;
  email: string;
  image: string;
  password: string;
  date_of_birth: string;
  date_of_joining: string;
  profile_photot: string;
};

export type Post = {
  post_id: number;
  username: string;
  content: string;
  created_at: DateTime;
  medialinks: string[];
};

export type PostUser = {
  post_id: number;
  username: string;
  image: string;
  name: string;
  content: string;
  created_at: DateTime;
  medialinks: string[];
};
