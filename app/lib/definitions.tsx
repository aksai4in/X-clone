export type User = {
  username: string;
  name: string;
  email: string;
  password: string;
  date_of_birth: string;
  date_of_joinign: string;
};

export type Post = {
  post_id: number;
  username: string;
  content: string;
  timestamp: string;
};
