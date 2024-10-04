import ImageGallery from "@/src/components/ImageGallery";
import nexiosInstance from "@/src/config/nexios.config";
import { PostResponse } from "@/src/types";

const PostDetailsPage = async ({ params }: { params: { postId: string } }) => {
  const res = await nexiosInstance.get<PostResponse>(`/post/${params.postId}`, {
    cache: "no-store",
    next: {},
  });

  const post = res?.data?.data;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="text-sm text-gray-500 mb-2">Category: {post.category}</p>
      <p className="text-sm text-gray-500 mb-6">
        Posted on: {new Date(post.createdAt).toLocaleDateString()}
      </p>
      <div className="mb-6">
        <ImageGallery images={post?.images} />
      </div>
      <div className="prose max-w-full">
        <p>{post.content}</p>
      </div>
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Tags:</h3>
        <ul className="flex flex-wrap gap-2">
          {post?.tags?.map((tag: string, index: number) => (
            <li
              key={index}
              className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full"
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PostDetailsPage;
