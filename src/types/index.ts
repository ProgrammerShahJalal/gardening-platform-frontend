import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

// Type for a reply within a comment
interface Reply {
  content: string;
  author: string;
  createdAt: string;
  _id: string;
}

// Type for a comment on a post
interface Comment {
  content: string;
  author: string;
  createdAt: string;
  _id: string;
  replies: Reply[];
}

// Main type for a post
export interface Post {
  _id: string;
  title: string;
  content: string;
  author: string;
  category: string;
  tags: string[];
  images: string[];
  isPremium: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  upvotes: string[]; // Array of user IDs who upvoted the post
  downvotes: string[]; // Array of user IDs who downvoted the post
  comments: Comment[];
}

export interface Posts {
  data: Post[];
}

// Response structure from the API
export interface PostResponse {
  data: Post;
}


export interface ApiError extends Error {
  response?: {
    data?: {
      message?: string;
    };
  };
}
