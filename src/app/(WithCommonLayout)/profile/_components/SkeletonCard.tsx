import { Card, Skeleton } from "@nextui-org/react";

export default function SkeletonCard() {
  const skeletonItems = [
    { key: "skeleton1", loading: true },
    { key: "skeleton2", loading: true },
    { key: "skeleton3", loading: true },
  ];
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">My Posts</h1>
      <div className="grid grid-flow-row-dense justify-center items-center grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        {skeletonItems.map((item, index) => (
          <Card className="w-[350px] space-y-5 p-4" radius="lg">
            <div className="max-w-[300px] w-full flex items-center gap-3">
              <div>
                <Skeleton className="flex rounded-full w-12 h-12" />
              </div>
              <div className="w-full flex flex-col gap-2">
                <Skeleton className="h-3 w-3/5 rounded-lg" />
                <Skeleton className="h-3 w-4/5 rounded-lg" />
              </div>
            </div>
            <Skeleton className="rounded-lg">
              <div className="h-36 rounded-lg bg-default-300"></div>
            </Skeleton>
            <div className="space-y-3">
              <Skeleton className="w-3/5 rounded-lg">
                <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
              </Skeleton>
              <Skeleton className="w-4/5 rounded-lg">
                <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
              </Skeleton>
              <Skeleton className="w-2/5 rounded-lg">
                <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
              </Skeleton>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}
