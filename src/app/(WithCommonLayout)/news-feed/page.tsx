"use client";

import { useState, useEffect, useCallback } from "react";
import { Input, Button, Chip, Image, Avatar } from "@nextui-org/react";
import clsx from "clsx";
import debounce from "lodash.debounce";
import InfiniteScroll from "react-infinite-scroll-component";
import { Post } from "@/src/types";
import { fetchAllPosts } from "@/src/services/postApi";

interface FilterOptions {
  search: string;
  category: string;
}

const NewsFeed: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    search: "",
    category: "all",
  });
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  // Fetch posts function
  const fetchPosts = async (pageNumber: number, filter?: FilterOptions) => {
    try {
      const allPosts = await fetchAllPosts({
        filterOptions: filter || filterOptions,
      });
      setPosts((prevPosts) => [...prevPosts, ...allPosts]);
      if (allPosts.length === 0 || allPosts.length < 10) {
        setHasMore(false); // Stop fetching if there are no more posts
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  // Load more posts for infinite scroll
  const loadMorePosts = () => {
    fetchPosts(page + 1, filterOptions);
    setPage(page + 1);
  };

  // Handle search input
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setFilterOptions((prev) => ({ ...prev, search: value }));
  };

  // Debounced function for searching
  const debouncedSearch = useCallback(debounce(handleSearchChange, 300), []);

  // Filter posts when options change
  useEffect(() => {
    setPosts([]); // Clear posts when filters change
    fetchPosts(1, filterOptions);
  }, [filterOptions]);

  return (
    <section className="w-full min-h-screen p-4">
      {/* Search and filter section */}
      <div className="flex justify-between items-center mb-6">
        <Input
          placeholder="Search posts..."
          onChange={debouncedSearch}
          className="max-w-md w-full"
        />
        <select
          value={filterOptions.category}
          onChange={(e) =>
            setFilterOptions((prev) => ({
              ...prev,
              category: e.target.value,
            }))
          }
          className="p-2 border border-gray-300 rounded-md"
        >
          <option value="all">All Categories</option>
          <option value="Vegetables">Vegetables</option>
          <option value="Flowers">Flowers</option>
          <option value="Landscaping">Landscaping</option>
          <option value="Fruits">Fruits</option>
        </select>
      </div>

      {/* Infinite scroll posts section */}
      <InfiniteScroll
        dataLength={posts.length}
        next={loadMorePosts}
        hasMore={hasMore}
        loader={<h4>Loading more posts...</h4>}
        endMessage={<p>No more posts available.</p>}
      >
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts
            .filter((post) =>
              post.title
                .toLowerCase()
                .includes(filterOptions.search.toLowerCase()),
            )
            .map((post) => (
              <div
                key={post._id}
                className={clsx("bg-green-800 p-4 shadow-lg rounded-lg")}
              >
                <div className="flex justify-between items-center">
                  <div className="flex justify-start items-center">
                    <Avatar
                      className="m-3"
                      src={post?.author?.profilePicture}
                      size="sm"
                    />
                    <p className="text-gray-600 dark:text-gray-100 text-sm">
                      {post?.author?.name}
                    </p>
                  </div>
                  {post?.isPremium && (
                    <Image
                      src="/diamond.gif"
                      alt="Premium Post"
                      className="m-3 w-7 h-7"
                    />
                  )}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">
                  {post.title}
                </h3>
                <div className="flex flex-wrap justify-start items-center gap-2">
                  {post?.tags?.map((tag) => (
                    <Chip key={tag} color="success" variant="solid" size="sm">
                      #{tag}
                    </Chip>
                  ))}
                </div>
                <Image
                  src={post?.images[0]}
                  alt={post?.title}
                  className="object-cover mt-3 pl-2 rounded-xl"
                  width={380}
                />
                <p className="text-white mt-3">
                  {post?.content.slice(0, 80)}...
                </p>
                <div className="flex justify-between items-center gap-2 text-sm text-gray-400">
                  <div>
                    <p>Category: {post.category}</p>
                    <p>Comments: {post.comments.length}</p>
                  </div>
                  <div>
                    <p>Upvotes: {post.upvotes.length}</p>
                    <p>Downvotes: {post.downvotes.length}</p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </InfiniteScroll>
    </section>
  );
};

export default NewsFeed;
