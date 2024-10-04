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

// Define the Profile interface
export interface Follower {
  _id: string;
  name: string;
  profilePicture: string;
}

export interface Profile {
  _id: string;
  name: string;
  email: string;
  role: string;
  profilePicture: string;
  followers: Follower[];
  following: Follower[];
  isVerified: boolean;
}

// Define the API response structure
export interface ProfileResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: Profile;
}

// Define the login user info types
export interface LoginUserInfo {
  _id: string;
  name: string;
  email: string;
  role: string;
  profilePicture?: string;
}

// Define the request payload types
export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  role?: string;
  securityAnswers: string[];
}

export interface LoginPayload {
  email: string;
  password: string;
}

// Define the response types
export interface AuthResponse {
  success: boolean;
  message: string;
  token: string;
  data: {
    _id: string;
    name: string;
    email: string;
    role: string;
    profilePicture?: string;
  };
}
