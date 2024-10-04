import Image from "next/image";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Image alt="loading" height={100} src="/loading.gif" width={100} />
      <h1 className="mt-4 text-xl font-semibold animate-pulse">
        Loading<span className="dot">....</span>
      </h1>
    </div>
  );
}
