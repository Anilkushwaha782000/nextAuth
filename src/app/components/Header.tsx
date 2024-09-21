
"use client"
import React,{useEffect, useState} from 'react'
import { useSession } from 'next-auth/react';
import { useRouter,usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai"
const Header = () => {
    const { data: session, status } = useSession();
    const router = useRouter()
    const pathName=usePathname()
    const [isOpen, setIsOpen] = useState(false);
    const [userData, setUserData] = useState<any>(null);
    const toggleMenu = () => {
      setIsOpen(!isOpen);
    };
    return (
        <header className="flex flex-col md:flex-row justify-between items-center p-4 bg-gray-800 text-white">
        <div className="flex items-center justify-between w-full md:w-auto mb-2 md:mb-0">
        <h1 className="text-lg md:text-xl">Task Management App</h1>
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
        <a href="/" className="hover:underline">
          Home
        </a>
        <a href="/about" className="hover:underline">
          About
        </a>
        <a href="/task" className="hover:underline">
          Task
        </a>
      </div>
    </nav>
        <div className='flex gap-4 items-center justify-center'>
                {status === 'authenticated' ? (
                  <div>
                    <span>{session?.user?.email}</span>
                    <button 
                onClick={()=>signOut()}
                className='px-4 py-2 bg-transparent text-white-500 hover:text-blue-600 border-none transition-all'>Logout</button>
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
