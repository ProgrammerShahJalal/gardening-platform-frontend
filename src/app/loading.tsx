"use client";

import {Image, Spinner} from "@nextui-org/react";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
         <Spinner color="success"/>
      <h1 className="mt-4 text-xl font-semibold animate-pulse">
        Loading<span className="dot">....</span>
      </h1>
    </div>
  );
}
