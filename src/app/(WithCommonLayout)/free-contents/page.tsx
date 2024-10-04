import { Link } from "@nextui-org/link";

import { title } from "@/src/components/primitives";
import nexiosInstance from "@/src/config/nexios.config";
import { Post, Posts } from "@/src/types";

const FreeContentsPage = async () => {
  const { data } = await nexiosInstance.get<Posts>("/post", {
    cache: "no-store",
    next: {},
  });

  // Filtering non-premium (free) content
  const freeContents = data?.data?.filter((post: Post) => !post.isPremium);

  return (
    <div>
      <h1 className={title()}>Free Contents</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {freeContents?.map((post: Post) => (
          <div key={post._id} className="border p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
            <p className="mb-4">{post.content.substring(0, 100)}...</p>
            {post.images.length > 0 && (
              <img
                alt={post.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
                src={post.images[0]}
              />
            )}
            <Link href={`/free-contents/${post._id}`}>
              <button className="text-blue-600 hover:underline">
                Read more
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FreeContentsPage;
