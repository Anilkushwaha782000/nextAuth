"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { AiOutlineMenu, AiOutlineClose,AiOutlineSwap } from "react-icons/ai";
import Link from "next/link";
import Loader from "./loder";
import { FiLogOut } from "react-icons/fi";
const Header = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathName = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  if (status == "loading") {
    return <Loader />;
  }
  return (
    <header className="flex flex-col md:flex-row justify-between items-center p-4 bg-gray-800 text-white">
      <div className="flex items-center justify-between w-full md:w-auto mb-2 md:mb-0">
        <Link href="/" className="text-lg md:text-xl">
          TaskFlow
        </Link>
        <button
          className="md:hidden p-2 ml-2"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          {isOpen ? (
            <AiOutlineClose className="w-6 h-6" />
          ) : (
            <AiOutlineMenu className="w-6 h-6" />
          )}
        </button>
      </div>
      <nav className="relative flex items-center justify-between mb-2 md:mb-0">
        <div
          className={`flex-col md:flex-row gap-2 md:gap-4 ${
            isOpen ? "flex" : "hidden"
          } md:flex`}
        >
          <a href="/managementTaskPage" className="hover:underline">
            Dashboard
          </a>
          <a href="/about" className="hover:underline">
            About
          </a>
          <a href="/task" className="hover:underline">
            Task
          </a>
          <button
            onClick={() => signOut()}
            className="md:hidden bg-transparent text-white-500 hover:text-blue-600 border-none transition-all flex flex-row gap-1"
          >
            Logout
            <FiLogOut size={24} />
          </button>
        </div>
      </nav>
      <div className="flex gap-4 items-center justify-center">
        {status === "authenticated" ? (
          <div>
            <div className="flex flex-row gap-2">
              <span>{session?.user?.email}</span>
              <button
                onClick={() => signOut()}
                className="hidden md:flex px-4 bg-transparent text-white-500 hover:text-blue-600 border-none transition-all flex-row gap-1"
              >
                Logout
                <FiLogOut size={24} />
              </button>
            </div>
          </div>
        ) : (
          pathName !== "/login" && (
            <button
              className="px-4 py-2 bg-transparent text-white hover:text-blue-600 transition-all"
              onClick={() => router.push("/login")}
            >
              Sign In
            </button>
          )
        )}
      </div>
    </header>
  );
};

export default Header;
