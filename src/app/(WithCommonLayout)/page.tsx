import GallarySection from "../(WithCommonLayout)/ourComponent/GallarySection";
import Hero from "./ourComponent/Hero";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4">
      <Hero />
      <GallarySection />
    </section>
  );
}
