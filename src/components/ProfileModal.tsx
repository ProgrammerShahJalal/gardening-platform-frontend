import React, { useState } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Button,
  ModalContent,
} from "@nextui-org/react";
import { toast } from "sonner";
import {
  IoCheckmarkDoneCircleOutline,
  IoCloseCircleOutline,
} from "react-icons/io5";

import { updateProfile } from "@/src/services/profileApi";
import { ProfileUpdate } from "@/src/types";
import { useAuth } from "../context/AuthContext";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData: ProfileUpdate; // Pre-fill the modal with existing user data
}

const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  initialData,
}) => {
  const [formData, setFormData] = useState<ProfileUpdate>(initialData);
  const [loading, setLoading] = useState(false);

  const {updateUserProfile, user} = useAuth();

  const currentUser = user?.data ? user?.data : user;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };


  const handleSubmit = async () => {
    setLoading(true);
    try {
        const response = await updateProfile(formData);
                // Call updateUserProfile from AuthContext to update profile optimistically
                updateUserProfile(formData);
        if (response.success) {
          toast('Profile updated successfully', {
            description: response.message,
            icon: <IoCheckmarkDoneCircleOutline />,
          });
          onClose(); // Close modal on success
        }
      } catch (error: any) {
        console.error('API Error:', error?.response?.data || error.message || 'Something went wrong'); 
        toast('Profile update failed', {
          description: error.response?.data?.message || 'Something went wrong',
          icon: <IoCloseCircleOutline />,
        });
      } finally {
        setLoading(false);
      }
    }    
    

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader>Edit Profile</ModalHeader>
        {
            (currentUser && initialData?.name) ? (
                <ModalBody>
          <Input
            label="Name"
            name="name"
            placeholder="Enter your name"
            value={formData.name || ""}
            onChange={handleInputChange}
          />
          <Input
            label="Phone"
            type="tel"
            name="phone"
            placeholder="Enter your phone number"
            value={formData.phone || ""}
            onChange={handleInputChange}
          />
          <Input
            label="Address"
            name="address"
            placeholder="Enter your address"
            value={formData.address || ""}
            onChange={handleInputChange}
          />

          <Input
            label="Profile Picture URL"
             type="url"
            name="profilePicture"
            placeholder="Enter your profile picture URL"
            value={formData.profilePicture || ""}
            onChange={handleInputChange}
          />
        </ModalBody>
            ) : <>
            <small className="text-center">Loading...</small>
            </>
        }
        <ModalFooter>
          <Button onPress={onClose} color="warning">Cancel</Button>
          <Button disabled={loading} onClick={handleSubmit} color="success">
            {loading ? "Saving..." : "Save"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ProfileModal;
