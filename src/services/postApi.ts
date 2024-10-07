"use server";

import { cookies } from "next/headers";
import nexiosInstance from "../config/nexios.config";
import { Post, PostResponse } from "../types";
import { getCurrentUser } from "./authApi";

// Function to fetch my posts
export const fetchMyPosts = async () => {
  const user = await getCurrentUser();
  try {
    const response = await nexiosInstance.get<PostResponse>(
      `/post?author=${user?._id}`
    );
    return response.data;
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
