"use client";
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";
import { link as linkStyles } from "@nextui-org/theme";
import NextLink from "next/link";
import clsx from "clsx";
import { siteConfig } from "@/src/config/site";
import { ThemeSwitch } from "@/src/components/theme-switch";
import Image from "next/image";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/button";
import { useEffect, useState } from "react";
import { handleLogout } from "../hooks/auth.hooks";

export const Navbar = () => {
  const router = useRouter();

  // Client-side state to check if user is logged in
  const [loggedIn, setLoggedIn] = useState(false);

  // This effect will only run on the client
  useEffect(() => {
    setLoggedIn(Cookies.get("accessToken") !== undefined);
  }, []);

  return (
    <NextUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Image src={"/logo.svg"} width={40} height={40} alt={"Logo"} />
            <p className="font-bold text-inherit">GreenLife</p>
          </NextLink>
        </NavbarBrand>
        <ul className="hidden lg:flex gap-4 justify-start ml-2">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium"
                )}
                color="foreground"
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <ThemeSwitch />
        <NavbarItem className="hidden md:flex">
          {loggedIn ? (
            <>
              {/* Show when user is logged in */}
              <NextLink href="/profile" className={(linkStyles(), "mr-4 mt-2")}>
                Profile
              </NextLink>
              <Button onClick={() => handleLogout(router)}>Logout</Button>
            </>
          ) : (
            <>
              {/* Show when user is not logged in */}
              <NextLink href="/login" className={(linkStyles(), "mr-2")}>
                Login
              </NextLink>
              <NextLink href="/register" className={(linkStyles(), "ml-2")}>
                Register
              </NextLink>
            </>
          )}
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === 2
                    ? "primary"
                    : index === siteConfig.navMenuItems.length - 1
                    ? "danger"
                    : "foreground"
                }
                href="#"
                size="lg"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}

          <NavbarMenuItem className="md:hidden flex">
            {loggedIn ? (
              <>
                {/* Show when user is logged in */}
                <NextLink
                  href="/profile"
                  className={(linkStyles(), "mr-4 mt-2")}
                >
                  Profile
                </NextLink>
                <br /> <br />
                <Button onClick={() => handleLogout(router)}>Logout</Button>
              </>
            ) : (
              <>
                {/* Show when user is not logged in */}
                <NextLink href="/login" className={(linkStyles(), "mr-2")}>
                  Login
                </NextLink>
                <NextLink href="/register" className={(linkStyles(), "ml-2")}>
                  Register
                </NextLink>
              </>
            )}
          </NavbarMenuItem>
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
};
