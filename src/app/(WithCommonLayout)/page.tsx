import GallarySection from "../(WithCommonLayout)/ourComponent/GallarySection";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <h1 className="text-3xl font-bold">
        Welcome to{" "}
        <span className="text-blue-500">Gardening Tips and Advice</span>
      </h1>
      <GallarySection />
    </section>
  );
}
