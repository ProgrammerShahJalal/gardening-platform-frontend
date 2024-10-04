"use client";

import React, { useState } from "react";
import { Avatar, Button, Input, Tabs, Tab } from "@nextui-org/react";
import NextLink from "next/link";
import { toast } from "sonner";
import {
  IoCheckmarkDoneCircleOutline,
  IoCloseCircleOutline,
} from "react-icons/io5";

import { title } from "@/src/components/primitives";
import { useAuth } from "@/src/context/AuthContext";
import { recoverPassword, changePassword } from "@/src/services/authApi";
import { ApiError } from "@/src/types";

const ProfilePage: React.FC = () => {
  const { user } = useAuth();

  const [answer1, setAnswer1] = useState("");
  const [answer2, setAnswer2] = useState("");
  const [newPass, setNewPass] = useState("");
  const [recoverLoading, setRecoverLoading] = useState(false);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [changeLoading, setChangeLoading] = useState(false);

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

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Profile Header */}
      <div className="flex flex-col items-center">
        <Avatar
          alt="Profile Picture"
          className="w-20 h-20 text-large rounded-full border-2 border-secondary shadow-md"
          src={user?.profilePicture}
        />
        <div className="text-center mt-4">
          <h1 className={title()}>{user?.name}</h1>✔ Verified
        </div>
        <div className="flex gap-4 mt-4">
          <NextLink href="/profile/edit">
            <Button color="primary" size="sm">
              Edit Profile
            </Button>
          </NextLink>
          Verify Profile
        </div>
      </div>

      {/* Parallax Tabs */}
      <div className="mt-10">
        <Tabs className="w-full" variant="solid">
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
            <div className="mt-4">
              <div className="flex flex-col gap-4">
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
                <Button disabled={changeLoading} onClick={handleChangePassword}>
                  {changeLoading ? "Changing..." : "Change Password"}
                </Button>
              </div>
            </div>
          </Tab>
          <Tab key="recoverPassword" title="Recover Password">
            <div className="mt-4">
              <div className="flex flex-col gap-4">
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
                  disabled={recoverLoading}
                  onClick={handleRecoverPassword}
                >
                  {recoverLoading ? "Recovering..." : "Recover Password"}
                </Button>
              </div>
            </div>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default ProfilePage;
