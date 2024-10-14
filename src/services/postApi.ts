"use server";

import nexiosInstance from "../config/nexios.config";
import { CommentsResponse, Post, PostResponse, Posts } from "../types";
import { getCurrentUser } from "./authApi";

// Modifying PostResponse to reflect nested data structure
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

//Function to get specific post by ID
export const getThePost = async (postId: string): Promise<Post[]> => {
  const user = await getCurrentUser();
  try {
    const response = await nexiosInstance.get<NestedPostResponse>(
      `/post/${postId}`,
    );
    return response?.data?.data?.data || [];
  } catch (error) {
    throw new Error("Failed to fetch the post data");
  }
};

// Function to fetch my posts
export const fetchMyPosts = async (): Promise<Post[]> => {
  const user = await getCurrentUser();
  try {
    const response = await nexiosInstance.get<NestedPostResponse>(
      `/post?author=${user?._id}`,
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
      {},
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
      {},
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
      {},
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to toggle favourite the post");
  }
};

/* =====================COMMENTS AND REPLIES API SERVICES========================== */
// Function to add comments on a post
export const addComments = async (postId: string, commentContent: string) => {
  const user = await getCurrentUser();
  if (!user) throw new Error("User not logged in");

  try {
    const response = await nexiosInstance.post<CommentsResponse>(
      `/post/${postId}/comments`,
      { content: commentContent }, // sending comment content
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to add comments");
  }
};

// Function to edit comments on a post
export const editComments = async (
  postId: string,
  commentId: string,
  newContent: string,
) => {
  const user = await getCurrentUser();
  if (!user) throw new Error("User not logged in");

  try {
    const response = await nexiosInstance.put<CommentsResponse>(
      `/post/${postId}/comments/${commentId}`,
      { content: newContent }, // sending updated comment content
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to edit the comments");
  }
};

// Function to delete comments on a post
export const deleteComments = async (postId: string, commentId: string) => {
  const user = await getCurrentUser();
  if (!user) throw new Error("User not logged in");

  try {
    const response = await nexiosInstance.delete<CommentsResponse>(
      `/post/${postId}/comments/${commentId}`,
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to delete the comments");
  }
};

// Function to reply to comments on a post
export const replyComments = async (
  postId: string,
  commentId: string,
  replyContent: string,
) => {
  const user = await getCurrentUser();
  if (!user) throw new Error("User not logged in");

  try {
    const response = await nexiosInstance.post<CommentsResponse>(
      `/post/${postId}/comments/${commentId}/replies`,
      { content: replyContent }, // sending reply content
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to add reply to the comment");
  }
};

// Function to fetch all posts
interface FilterOptions {
  search: string;
  category: string;
}

export const fetchAllPosts = async ({
  filterOptions,
}: {
  filterOptions: FilterOptions;
}): Promise<Post[]> => {
  const user = await getCurrentUser();
  try {
    const queryParams = new URLSearchParams();

    if (filterOptions.category && filterOptions.category !== "all") {
      queryParams.append("category", filterOptions.category);
    }

    if (filterOptions.search) {
      queryParams.append("search", filterOptions.search);
    }

    const response = await nexiosInstance.get<NestedPostResponse>(
      `/post?sortedBy=upvotes&${queryParams.toString()}`,
    );

    return response?.data?.data?.data || [];
  } catch (error) {
    throw new Error("Failed to fetch all posts data");
  }
};
