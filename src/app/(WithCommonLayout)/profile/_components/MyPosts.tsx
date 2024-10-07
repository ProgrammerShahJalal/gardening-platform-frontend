import { useEffect, useState } from "react";
import { useAuth } from "@/src/context/AuthContext";
import { Post, PostResponse } from "@/src/types";
import { fetchMyPosts } from "@/src/services/postApi";
import SkeletonCard from "./SkeletonCard";
import PostCard from "@/src/components/PostCard";

const MyPosts = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch user's posts
  useEffect(() => {
    const fetchPosts = async () => {
      if (!user) {
        setError("You need to be logged in to view your posts.");
        setLoading(false);
        return;
      }

      try {
        const fetchedPosts: PostResponse = await fetchMyPosts();
        setPosts(fetchedPosts?.data);
      } catch (err) {
        setError("Failed to load your posts. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [user]);

  if (loading) {
    return (
      <>
        <SkeletonCard />
      </>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-start">
        <h3 className="text-red-600">{error}</h3>
      </div>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <div className="flex justify-center items-start">
        <h3>No posts found.</h3>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">My Posts</h1>
      <div className="grid grid-flow-row-dense justify-center items-center grid-cols-1 md:grid-cols-3 gap-4">
        {posts.map((post: Post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default MyPosts;
