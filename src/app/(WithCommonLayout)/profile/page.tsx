"use client";

import React, { useState } from "react";
import { Avatar, Button, Input, Tabs, Tab, Badge } from "@nextui-org/react";
import { toast } from "sonner";
import {
  IoCheckmarkDoneCircleOutline,
  IoCloseCircleOutline,
} from "react-icons/io5";

import { title } from "@/src/components/primitives";
import { useAuth } from "@/src/context/AuthContext";
import { recoverPassword, changePassword } from "@/src/services/authApi";
import { ApiError, PResponse } from "@/src/types";
import ProfileModal from "@/src/components/ProfileModal";

const ProfilePage: React.FC = () => {
  const { user} = useAuth();

  const [answer1, setAnswer1] = useState("");
  const [answer2, setAnswer2] = useState("");
  const [newPass, setNewPass] = useState("");
  const [recoverLoading, setRecoverLoading] = useState(false);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [changeLoading, setChangeLoading] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const currentUser = user?.data ? user?.data : user;

  // Handle password recovery
  const handleRecoverPassword = async () => {
    try {
      setRecoverLoading(true);
      const response = await recoverPassword({
        email: user?.email || "",
        answer1,
        answer2,
        newPass,
      });

      if (response?.success) {
        toast("Recovered successfull!", {
          className: "border-green-500 text-base",
          description: response?.message,
          duration: 3000,
          icon: <IoCheckmarkDoneCircleOutline />,
        });
        // Reset the input fields
        setAnswer1("");
        setAnswer2("");
        setNewPass("");
      } else {
        toast("Recover failed!", {
          className: "border-red-500 text-base",
          description: response?.message || "Security answers are incorrect",
          duration: 3000,
          icon: <IoCloseCircleOutline />,
        });
      }
    } catch (error) {
      const errorAsError: ApiError = error as Error;

      toast("Password recover failed!", {
        className: "border-red-500 text-base",
        description: errorAsError?.message,
        duration: 3000,
        icon: <IoCloseCircleOutline />,
      });
    } finally {
      setRecoverLoading(false);
    }
  };

  // Handle password change
  const handleChangePassword = async () => {
    try {
      setChangeLoading(true);
      const response = await changePassword({
        email: user?.email || "",
        oldPassword,
        newPassword,
      });

      if (response?.success) {
        toast("Changed successfull!", {
          className: "border-green-500 text-base",
          description: response?.message,
          duration: 3000,
          icon: <IoCheckmarkDoneCircleOutline />,
        });
        // Reset the input fields
        setOldPassword("");
        setNewPassword("");
      } else {
        toast("Change failed!", {
          className: "border-red-500 text-base",
          description: response?.message || "Old password is incorrect",
          duration: 3000,
          icon: <IoCloseCircleOutline />,
        });
      }
    } catch (error) {
      const errorAsError: ApiError = error as Error;

      toast("Password update failed!", {
        className: "border-red-500 text-base",
        description: errorAsError?.message,
        duration: 3000,
        icon: <IoCloseCircleOutline />,
      });
    } finally {
      setChangeLoading(false);
    }
  };

  // Function to open modal
  const handleEditProfile = () => setIsModalOpen(true);

  // Function to close modal
  const handleCloseModal = () => setIsModalOpen(false);

console.log("user from profile=> ", currentUser);
  return (
    <div className="container mx-auto px-4 py-6">
      {/* Profile Header */}
      <div className="flex flex-col items-center">
        {
          currentUser?.isVerified ? <Badge 
          content=" Verified ✔"   
          color="danger" 
          placement="top-right">
            <Avatar
          alt="Profile Picture"
          className="w-20 h-20 text-large rounded-full border-2 border-secondary shadow-md"
          src={currentUser?.profilePicture}
        />
          </Badge> : <Avatar
          alt="Profile Picture"
          className="w-20 h-20 text-large rounded-full border-2 border-secondary shadow-md"
          src={currentUser?.profilePicture}
        />
        }
        
        <div className="text-center mt-4">
          <h1 className={title()}>{currentUser?.name}</h1>
          <p className="text-gray-600">{currentUser?.phone}</p>
          <p className="text-gray-600">{currentUser?.email}</p>
          <p className="text-gray-600">{currentUser?.address}</p>

        </div>
        {currentUser && (
          <div className="flex gap-4 mt-4">
          <Button color="primary" size="sm" onClick={handleEditProfile}>
            Edit Profile
          </Button>
      </div>
        )}
      </div>

      {/* Modal for editing profile */}
      {currentUser && (
        <ProfileModal
        initialData={{
          name: currentUser?.name,
          phone: currentUser?.phone,
          address: currentUser?.address,
          profilePicture: currentUser?.profilePicture,
        }}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
      )}

      {/* Parallax Tabs */}
      <div className="mt-10">
        <Tabs className="w-full" color="primary" variant="solid">
          <Tab key="posts" title="My Posts">
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {/* Render user's posts here */}
            </div>
          </Tab>
          <Tab key="followers" title="Followers 10">
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {/* Render user's followers here */}
            </div>
          </Tab>
          <Tab key="changePassword" title="Change Password">
            <div className="mt-4 flex flex-col gap-4 max-w-sm mx-auto sm:max-w-md lg:max-w-lg">
              <Input
                label="Old Password"
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
              <Input
                label="New Password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <Button
                color="primary"
                disabled={changeLoading}
                onClick={handleChangePassword}
              >
                {changeLoading ? "Changing..." : "Change Password"}
              </Button>
            </div>
          </Tab>
          <Tab key="recoverPassword" title="Recover Password">
            <div className="mt-4 flex flex-col gap-4 max-w-sm mx-auto sm:max-w-md lg:max-w-lg">
              <Input
                label="Answer 1: In what city and state were you born?"
                value={answer1}
                onChange={(e) => setAnswer1(e.target.value)}
              />
              <Input
                label="Answer 2: What is your favorite childhood toy?"
                value={answer2}
                onChange={(e) => setAnswer2(e.target.value)}
              />
              <Input
                label="New Password"
                type="password"
                value={newPass}
                onChange={(e) => setNewPass(e.target.value)}
              />
              <Button
                color="primary"
                disabled={recoverLoading}
                onClick={handleRecoverPassword}
              >
                {recoverLoading ? "Recovering..." : "Recover Password"}
              </Button>
            </div>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default ProfilePage;
