import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  RadioGroup,
  Radio,
} from "@nextui-org/react";
import { Comment } from "../types";

interface CommentsModalProps {
  isOpen: boolean;
  onClose: () => void;
  comment: Comment; // Pre-fill the modal with existing user data
}

const CommentsModal: React.FC<CommentsModalProps> = ({
  isOpen,
  onClose,
  comment,
}) => {
  const { onOpen, onOpenChange } = useDisclosure();

  return (
    <div className="flex flex-col gap-2">
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        placement="auto"
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {comment?.content}
                {comment?.author?.name}
              </ModalHeader>
              <ModalBody>
                <p>
                  {comment?.replies?.map((reply) => (
                    <div key={reply?._id}>
                      <p>{reply?.content}</p>
                      <p>{reply?.author?.name}</p>
                      <p>{reply?.createdAt}</p>
                    </div>
                  ))}
                </p>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default CommentsModal;
