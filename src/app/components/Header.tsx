
"use client"
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
const Header = () => {
    const { data: session, status } = useSession();
    const router = useRouter()
    console.log("result>>",status)
    console.log("session credentials>>",session)
    return (
        <header className="flex flex-col md:flex-row justify-between items-center p-4 bg-gray-800 text-white">
        <h1 className="text-lg md:text-xl mb-2 md:mb-0">Task Management App</h1>
        <nav className="flex flex-col md:flex-row gap-2 md:gap-4 mb-2 md:mb-0">
            <a href="/" className="hover:underline">
                Home
            </a>
            <a href="/about" className="hover:underline">
                About
            </a>
            <a href="/task" className="hover:underline">
                Task
            </a>
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
                    <button
                        className="px-4 py-2 bg-transparent text-white-500 hover:text-blue-600 border-none transition-all"
                        onClick={() => router.push('/login')}
                    >
                        Sign In
                    </button>
                )}
                
            </div>
    </header>
    
    );
};

export default Header;
