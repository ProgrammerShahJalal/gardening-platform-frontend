import React from "react";
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
import { Post } from "../types";
import ImageGallery from "./ImageGallery";

interface PostDetailModalProps {
  post: Post | null;
  isOpen: boolean;
  onClose: () => void;
}

const PostDetailModal: React.FC<PostDetailModalProps> = ({
  post,
  isOpen,
  onClose,
}) => {
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
                <p className="text-gray-400 text-md">
                  Category: {post?.category} | Created at:{" "}
                  {new Date(post?.createdAt).toLocaleDateString()}
                </p>
                {/* TAGS */}
                <div className="flex gap-2 mt-2">
                  {post?.tags?.map((tag, index) => (
                    <span
                      key={index}
                      className="text-xs bg-gray-200 dark:bg-black px-2 py-1 rounded"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </ModalHeader>
              <ModalBody>
                {post?.images && <ImageGallery images={post?.images} />}
                <p>{post?.content}</p>

                <div className="my-4">
                  <div>
                    <Image
                      src={post?.author?.profilePicture}
                      alt={post?.author?.name}
                      width={100}
                      height={100}
                    />
                  </div>

                  <div className="my-2">
                    <p className="text-gray-500 dark:text-gray-200">
                      Author: {post?.author?.name}
                    </p>
                    <p className="text-gray-500 dark:text-gray-200">
                      Email: {post?.author?.email}
                    </p>
                  </div>
                </div>
              </ModalBody>
              <form className="w-11/12 flex flex-wrap gap-2 mx-auto mb-12">
                <Textarea
                  fullWidth
                  required
                  label="Share your thoughts"
                  name="comments"
                  type="text"
                />
                <Button>Comment</Button>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default PostDetailModal;
