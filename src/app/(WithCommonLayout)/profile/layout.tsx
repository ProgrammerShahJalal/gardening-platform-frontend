import { siteConfig } from "@/src/config/site";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: {
      default: "Profile",
      template: `%s - ${"Profile"}`,
    },
    description: siteConfig.description,
    icons: {
      icon: "/favicon.ico",
    },
  };

export default function ProfileLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <section>
        <div>{children}</div>
      </section>
    );
}
  