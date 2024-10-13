import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  Image,
  Input,
  Button,
  Textarea,
} from "@nextui-org/react";
import { Post, Comment, Author } from "../types";
import {
  addComments,
  editComments,
  deleteComments,
  getThePost,
  replyComments,
} from "../services/postApi";
import { toast } from "sonner";
import ImageInModal from "./ImageInModal";
import { useAuth } from "../context/AuthContext";

interface PostDetailModalProps {
  post: Post | null;
  isOpen: boolean;
  onClose: () => void;
  comments: Comment[];
  updateComments: (newComments: Comment[]) => void;
}

const PostDetailModal: React.FC<PostDetailModalProps> = ({
  post,
  isOpen,
  onClose,
  comments,
  updateComments,
}) => {
  const [commentContent, setCommentContent] = useState("");
  const [replyContent, setReplyContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedCommentId, setSelectedCommentId] = useState<string | null>(
    null
  );

  const { user } = useAuth();

  const handleCommentSubmit = async () => {
    if (post && commentContent) {
      setIsSubmitting(true); // Change button text to "Commenting..."

      try {
        // Optimistic UI update: Create a new comment object locally
        const newComment: Comment = {
          author: {
            _id: user?._id || "",
            name: user?.name || "",
            email: user?.email || "",
            profilePicture: user?.profilePicture || "",
          },
          content: commentContent,
          createdAt: new Date().toISOString(),
          _id: user?._id + "5g",
          replies: [],
        };

        // Optimistically update the UI with the new comment
        updateComments([...comments, newComment]);

        // Make the actual API request to add the comment
        const response = await addComments(post._id, commentContent);

        if (response?.statusCode === 200) {
          toast.success(response?.message || "Comment added successfully.");
          setCommentContent("");

          // Replace the temporary comment with the real one from the response
          const updatedComment: Comment = {
            author: response.data.author, // Use the author from the response
            content: response.data.content,
            createdAt: response.data.createdAt,
            _id: response.data._id, // Use the real ID from the response
            replies: [], // Replies (if applicable)
          };

          updateComments([
            ...comments.filter((comment) => comment._id !== "temporary-id"), // Remove the temporary comment
            updatedComment,
          ]);
        } else {
          toast.error(response.message || "Something went wrong.");
          // Optionally, you could remove the optimistically added comment here if the request fails
        }
      } catch (error) {
        toast.error("Failed to add comment.");
        // Optionally, you could remove the optimistically added comment here if the request fails
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleReplySubmit = async (commentId: string) => {
    if (post && replyContent) {
      const response = await replyComments(post._id, commentId, replyContent);
      setReplyContent("");
      setSelectedCommentId(null);
      await getThePost(post?._id);
      if (response?.statusCode === 200) {
        toast.success(response?.message || "Reply added successfully.");
      } else {
        toast.message(response.message || "Something went wrong.");
      }
    }
  };

  if (!post) return null;
  const { onOpenChange } = useDisclosure();

  return (
    <div className="flex flex-col gap-2">
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        onOpenChange={onOpenChange}
        scrollBehavior="outside"
        size="5xl"
        backdrop="blur"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h2 className="text-2xl">{post?.title}</h2>
                {/* ... */}
              </ModalHeader>
              <ModalBody>
                {post?.images && <ImageInModal images={post?.images} />}
                <p>{post?.content}</p>

                {/* Comment Section */}
                <form className="w-11/12 flex flex-wrap gap-2 mx-auto mb-12">
                  <Textarea
                    fullWidth
                    required
                    label="Share your thoughts"
                    value={commentContent}
                    onChange={(e) => setCommentContent(e.target.value)}
                  />
                  <Button onClick={handleCommentSubmit} disabled={isSubmitting}>
                    {isSubmitting ? "Commenting..." : "Comment"}
                  </Button>
                </form>
                {/* Displaying Comments */}
                {post?.comments?.length > 0 && (
                  <div className="flex flex-col gap-2 mt-4">
                    {post?.comments?.map((comment, index) => (
                      <div
                        key={index}
                        className="w-11/12 flex flex-wrap gap-2 mx-auto mb-12 border rounded-xl px-3 py-8"
                      >
                        <Image
                          src={comment?.author?.profilePicture}
                          alt={comment?.author?.name}
                          width={64}
                          height="auto"
                        />
                        <p className="text-green-500">
                          {comment?.author?.name}
                        </p>
                        <p className="text-black dark:text-gray-100">
                          {comment?.content}
                        </p>

                        {/* Reply Section */}
                        <div className="flex flex-col gap-2 ml-10">
                          {comment?.replies.map((reply, idx) => (
                            <div key={idx} className="w-full">
                              <p className="text-blue-500">
                                {reply.author.name}:
                              </p>
                              <p>{reply.content}</p>
                            </div>
                          ))}

                          {selectedCommentId === comment._id ? (
                            <div>
                              <Textarea
                                fullWidth
                                required
                                label="Reply"
                                value={replyContent}
                                onChange={(e) =>
                                  setReplyContent(e.target.value)
                                }
                              />
                              <Button
                                className="my-2"
                                onClick={() => handleReplySubmit(comment._id)}
                              >
                                Reply
                              </Button>
                            </div>
                          ) : (
                            <Button
                              onClick={() => setSelectedCommentId(comment._id)}
                            >
                              Reply
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default PostDetailModal;
