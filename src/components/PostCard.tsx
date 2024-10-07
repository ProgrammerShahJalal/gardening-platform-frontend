import {
  Avatar,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Image,
} from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import { BiDownvote, BiUpvote, BiHeart, BiCommentDetail } from "react-icons/bi";
import { Post } from "../types";
import {
  downvotePost,
  upvotePost,
  toggleFavouritePost,
} from "../services/postApi";
import { toast } from "sonner";
import {
  IoCheckmarkDoneCircleOutline,
  IoCloseCircleOutline,
} from "react-icons/io5";
import { getCurrentUser } from "../services/authApi";

const PostCard = ({ post }: { post: Post }) => {
  const [upvotes, setUpvotes] = useState(post?.upvotes?.length);
  const [downvotes, setDownvotes] = useState(post?.downvotes?.length);
  const [isUpvoted, setIsUpvoted] = useState(false);
  const [isDownvoted, setIsDownvoted] = useState(false);
  const [isFavourite, setIsFavourite] = useState(false);

  // Fetch the user profile to check favourites
  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const profileResponse = await getCurrentUser();
        const profile = profileResponse;

        console.log("profile", profile);

        // Check if the post is in the user's favourites
        setIsFavourite(profile?.favourites.includes(post._id));
        console.log("isFavourite", isFavourite);
        setIsUpvoted(post?.upvotes.includes(profile?._id));
        setIsDownvoted(post?.downvotes.includes(profile?._id));
      } catch (error) {
        console.error("Failed to fetch user profile", error);
      }
    };

    getUserProfile();
  }, [post._id]);

  const handleUpvote = async () => {
    try {
      const response = await upvotePost(post._id);
      if (response?.success) {
        if (isUpvoted) {
          setUpvotes(upvotes - 1);
        } else {
          setUpvotes(upvotes + 1);
          if (isDownvoted) {
            setDownvotes(downvotes - 1);
            setIsDownvoted(false);
          }
        }
        setIsUpvoted(!isUpvoted);
        toast("Upvote updated successfully!", {
          className: "border-green-500 text-base",
          description: response?.message,
          duration: 3000,
          icon: <IoCheckmarkDoneCircleOutline />,
        });
      } else {
        throw new Error(response?.message || "Failed to upvote post");
      }
    } catch (error) {
      toast("Upvote failed!", {
        className: "border-red-500 text-base",
        description: "Failed to upvote post.",
        duration: 3000,
        icon: <IoCloseCircleOutline />,
      });
    }
  };

  const handleDownvote = async () => {
    try {
      const response = await downvotePost(post._id);
      if (response?.success) {
        if (isDownvoted) {
          setDownvotes(downvotes - 1);
        } else {
          setDownvotes(downvotes + 1);
          if (isUpvoted) {
            setUpvotes(upvotes - 1);
            setIsUpvoted(false);
          }
        }
        setIsDownvoted(!isDownvoted);
        toast("Downvote updated successfully!", {
          className: "border-green-500 text-base",
          description: response?.message,
          duration: 3000,
          icon: <IoCheckmarkDoneCircleOutline />,
        });
      } else {
        throw new Error(response?.message || "Failed to downvote post");
      }
    } catch (error) {
      toast("Downvote failed!", {
        className: "border-red-500 text-base",
        description: "Failed to downvote post.",
        duration: 3000,
        icon: <IoCloseCircleOutline />,
      });
    }
  };

  const handleToggleFavourite = async () => {
    try {
      const response = await toggleFavouritePost(post._id);
      if (response?.statusCode === 200) {
        setIsFavourite(!isFavourite);
        const message = isFavourite
          ? "Post removed from favourites"
          : "Post added to favourites";
        toast(message, {
          className: "border-green-500 text-base",
          description: response?.message,
          duration: 3000,
          icon: <IoCheckmarkDoneCircleOutline />,
        });
      } else {
        throw new Error(response?.message || "Failed to toggle favourite");
      }
    } catch (error) {
      toast("Failed to toggle favourite!", {
        className: "border-red-500 text-base",
        description: "Failed to toggle favourite post.",
        duration: 3000,
        icon: <IoCloseCircleOutline />,
      });
    }
  };

  return (
    <Card key={post._id} className="w-[350px] mx-auto">
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
      <CardHeader>
        <div className="flex flex-col justify-start items-start">
          <h4 className="text-lg text-center font-semibold">{post.title}</h4>
          <div className="flex flex-wrap justify-start items-center gap-2">
            {post?.tags?.map((tag) => (
              <Chip key={tag} color="success" variant="bordered" size="sm">
                {tag}
              </Chip>
            ))}
          </div>
          <div className="grid grid-flow-row grid-cols-2 justify-between items-center gap-2 mt-2">
            <small className="text-gray-600 dark:text-gray-100">
              Category: {post.category}
            </small>
            <small className="text-gray-600 dark:text-gray-100">
              Created at: {new Date(post.createdAt).toLocaleDateString()}
            </small>
          </div>
        </div>
      </CardHeader>
      <CardBody>
        <Image
          src={post?.images[0]}
          alt={post.title}
          className="object-cover mt-3 pl-2 rounded-xl"
          width={320}
        />
        <p className="mt-3 dark:text-gray-100 text-gray-800">
          {post.content.slice(0, 30)}...
        </p>
      </CardBody>
      <CardFooter>
        <div className="w-[96%] mx-auto flex justify-center items-center gap-12 mb-2">
          <div
            className="grid grid-cols-2 gap-1 cursor-pointer"
            onClick={handleUpvote}
          >
            <BiUpvote color={isUpvoted ? "green" : ""} />
            <small>{upvotes}</small>
          </div>
          <div
            className="grid grid-cols-2 gap-1 cursor-pointer"
            onClick={handleDownvote}
          >
            <BiDownvote color={isDownvoted ? "red" : ""} />
            <small>{downvotes}</small>
          </div>
          <div className="cursor-pointer" onClick={handleToggleFavourite}>
            <BiHeart color={isFavourite ? "red" : ""} />
          </div>
          <div className="cursor-pointer">
            <BiCommentDetail />
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default PostCard;
