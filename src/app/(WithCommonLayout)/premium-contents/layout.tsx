export default function PremiumContentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="my-12">
      <div>{children}</div>
    </section>
  );
}
