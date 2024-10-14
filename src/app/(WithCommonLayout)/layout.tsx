import { Navbar } from "@/src/components/Navbar";

export default async function layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col h-screen">
      <Navbar />
      <main>{children}</main>
    </div>
  );
}
