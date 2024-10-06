"use client";
import {Image} from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function NotFoundPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <Image
        alt="Page not found illustration"
        className="mx-auto"
        height={300}
        src="/notfound.png"
        width={300}
      />
      <h1 className="text-4xl font-bold text-gray-800 mt-8">
        404: Page Not Found
      </h1>
      <p className="text-gray-600 mt-4">
        Oops! The page you&apos;re looking for doesn&apos;t exist or has been
        moved.
      </p>
      <button
        className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-md shadow-lg hover:bg-blue-700 transition-colors"
        onClick={() => router.push("/")}
      >
        Go Back to Home
      </button>
    </div>
  );
}
