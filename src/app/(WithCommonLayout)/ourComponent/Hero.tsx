"use client";

import { Button } from "@nextui-org/react";
import clsx from "clsx";

const Hero: React.FC = () => {
  return (
    <section
      className={clsx(
        "relative w-full h-screen bg-fixed bg-center bg-cover",
        "flex items-center justify-center text-center text-white",
        "before:absolute before:inset-0 before:bg-green-800/80",
      )}
      style={{
        backgroundImage: `url('https://demo.awaikenthemes.com/florax/wp-content/uploads/2024/09/intro-video-bg.jpg')`,
      }}
    >
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          Welcome to the Gardening World
        </h1>
        <p className="mt-4 text-lg md:text-xl">
          Discover the best tips, tricks, and tools to help your garden thrive.
        </p>
        <Button className="mt-8" size="lg" color="primary" radius="full">
          Get Started
        </Button>
      </div>
    </section>
  );
};

export default Hero;
