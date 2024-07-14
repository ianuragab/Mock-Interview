"use client";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const Header = () => {
  const router = useRouter();

  const path = usePathname;
  return (
    <div className="flex p-4 items-center justify-between bg-secondary shadow-lg sticky">
      <Image src={"/logo.svg"} width={140} height={96} alt="logo" />
      <ul className="hidden md:flex gap-6 nav-items">
        <li
          className={`text-primary font-bold transition-all cursor-pointer ${
            path == "/dashboard" && "text-primary font-bold"
          }`}
          onClick={() => router.push("/dashboard")}
        >
          Dashboard
        </li>
        <li
          className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${
            path == "/dashboard/questions" && "text-primary font-bold"
          }`}
        >
          Questions
        </li>
        <li
          className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${
            path == "/dashboard/upgrade" && "text-primary font-bold"
          }`}
        >
          Upgrade
        </li>
        <li
          className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${
            path == "/dashboard/how" && "text-primary font-bold"
          }`}
        >
          How it Works?
        </li>
        <UserButton />
      </ul>
    </div>
  );
};
export default Header;
