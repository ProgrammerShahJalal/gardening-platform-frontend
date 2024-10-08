"use server";

import { cookies } from "next/headers";
import nexiosInstance from "../config/nexios.config";
import { Post, PostResponse, Posts } from "../types";
import { getCurrentUser } from "./authApi";

// Modify PostResponse to reflect nested data structure
export interface NestedPostResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    success: boolean;
    statusCode: number;
    message: string;
    data: Post[];
  };
}
// Function to fetch my posts
export const fetchMyPosts = async (): Promise<Post[]> => {
  const user = await getCurrentUser();
  try {
    const response = await nexiosInstance.get<NestedPostResponse>(
      `/post?author=${user?._id}`
    );
    return response?.data?.data?.data || []; 
  } catch (error) {
    throw new Error("Failed to fetch my posts data");
  }
};

// Function to upvote a post
export const upvotePost = async (postId: string) => {
  const user = await getCurrentUser();
  if (!user) throw new Error("User not logged in");

  try {
    const response = await nexiosInstance.post<PostResponse>(
      `/post/${postId}/upvote`,
      {}
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to upvote the post");
  }
};
// Function to downvote a post
export const downvotePost = async (postId: string) => {
  const user = await getCurrentUser();
  if (!user) throw new Error("User not logged in");

  try {
    const response = await nexiosInstance.post<PostResponse>(
      `/post/${postId}/downvote`,
      {}
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to downvote the post");
  }
};
// Function to toggle favourite a post (add/remove in favourites post list)
export const toggleFavouritePost = async (postId: string) => {
  const user = await getCurrentUser();
  if (!user) throw new Error("User not logged in");

  try {
    const response = await nexiosInstance.post<PostResponse>(
      `/post/favourites/${postId}`,
      {}
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to toggle favourite the post");
  }
};
