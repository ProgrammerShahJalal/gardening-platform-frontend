import ImageGallery from "@/src/components/ImageGallery";

export default function GallerySection() {
  // image URLs
  const recentGardeningImages = [
    "https://cdn.pixabay.com/photo/2015/03/12/17/24/garden-670516_960_720.jpg",
    "	https://cdn.pixabay.com/photo/2018/07/29/21/32/flowers-3571119_960_720.jpg",
    "https://images.pexels.com/photos/701758/pexels-photo-701758.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/395044/pexels-photo-395044.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/35847/summer-still-life-daisies-yellow.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/1145257/pexels-photo-1145257.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  ];

  return (
    <section className="py-12">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold text-green-600 mb-6">
          Recent Gardening Images
        </h2>
        <p className="mb-8 text-gray-600">
          Explore some of the most beautiful and creative gardening images
          contributed by our community.
        </p>
        <ImageGallery images={recentGardeningImages} />
      </div>
    </section>
  );
}
