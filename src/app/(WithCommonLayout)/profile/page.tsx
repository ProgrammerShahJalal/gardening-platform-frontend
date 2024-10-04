"use client";

import React from "react";
import { Avatar, Button, Tabs, Tab } from "@nextui-org/react";
import NextLink from "next/link";

import { title } from "@/src/components/primitives";
import { useAuth } from "@/src/context/AuthContext";

const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  // const [isFollowing, setIsFollowing] = useState(false);

  // const handleFollowToggle = () => {
  //   setIsFollowing(!isFollowing);
  // };

  // const handleVerifyProfile = () => {
  //   // Handle Stripe payment for verification
  // };

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Profile Header */}
      <div className="flex flex-col items-center">
        {/* Profile Picture */}
        <Avatar
          alt="Profile Picture"
          className="w-20 h-20 text-large rounded-full border-2 border-secondary shadow-md"
          src={user?.profilePicture}
        />
        {/* Name and Verified Badge */}
        <div className="text-center mt-4">
          <h1 className={title()}>{user?.name}</h1>
          {/* {isVerified && (
            <span className="ml-2 text-sm font-medium text-blue-500">
              ✔ Verified
            </span>
          )} */}
          ✔ Verified
        </div>

        {/* Edit Profile / Follow Button */}
        <div className="flex gap-4 mt-4">
          <NextLink href="/profile/edit">
            <Button color="primary" size="sm">
              Edit Profile
            </Button>
          </NextLink>
          {/* <Button
            color={isFollowing ? "danger" : "primary"}
            size="sm"
            onClick={handleFollowToggle}
          >
            {isFollowing ? "Unfollow" : "Follow"}
          </Button> */}
          {/* {!isVerified && (
            <Button color="warning" size="sm" onClick={handleVerifyProfile}>
              Verify Profile
            </Button>
          )} */}
          Verify Profile
        </div>
      </div>

      {/* Parallax Tabs */}
      <div className="mt-10">
        {/* <Tabs className="w-full" defaultValue="posts" variant="solid"> */}
        <Tabs className="w-full" variant="solid">
          <Tab key="posts" title="My Posts">
            {/* Posts Section */}
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {/* {posts.map((post) => (
                <div
                  key={post.id}
                  className="bg-white p-4 rounded-lg shadow-md"
                >
                  <h3 className="font-bold text-lg">{post.title}</h3>
                  <p className="mt-2 text-gray-600">{post.content}</p>
                </div>
              ))} */}
            </div>
          </Tab>

          {/* <Tab key="followers" title={`Followers (${followers.length})`}> */}
          <Tab key="followers" title={"Followers 10"}>
            {/* Followers Section */}
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {/* {followers.map((follower) => (
                <div
                  key={follower.id}
                  className="bg-white p-4 rounded-lg shadow-md"
                >
                  <Avatar
                    className="mr-2"
                    size="sm"
                    src={follower.profilePicture}
                  />
                  <span>{follower.name}</span>
                </div>
              ))} */}
            </div>
          </Tab>

          {/* <Tab key="following" title={`Following (${following.length})`}> */}
          <Tab key="following" title={"Following 5"}>
            {/* Following Section */}
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {/* {following.map((followee) => (
                <div
                  key={followee.id}
                  className="bg-white p-4 rounded-lg shadow-md"
                >
                  <Avatar
                    className="mr-2"
                    size="sm"
                    src={followee.profilePicture}
                  />
                  <span>{followee.name}</span>
                </div>
              ))} */}
            </div>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default ProfilePage;
