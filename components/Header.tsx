"use client";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
} from "@heroui/react";
import { useState } from "react";
import ThemeToggle from "./ThemeToggle";

const navItems = [
  { label: "About Me", href: "#about" },
  { label: "Blogs", href: "#blogs" },
  { label: "Get in Touch", href: "#contact" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <Navbar
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      maxWidth="xl"
      isBordered
      classNames={{
        base: "bg-background/70 backdrop-blur-md",
        wrapper: "px-4 sm:px-6",
      }}
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Link href="/" className="font-bold text-inherit text-lg">
            Kavindu Perera
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-6" justify="center">
        {navItems.map((item) => (
          <NavbarItem key={item.href}>
            <Link
              href={item.href}
              color="foreground"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              {item.label}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          <ThemeToggle />
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {navItems.map((item) => (
          <NavbarMenuItem key={item.href}>
            <Link
              href={item.href}
              color="foreground"
              className="w-full text-base"
              size="lg"
              onPress={handleNavClick}
            >
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
