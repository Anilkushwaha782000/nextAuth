"use client"
import React from 'react'
import Header from '../components/Header'
import UserProfileMenu from '../components/userProfilemenu';
import { useState } from 'react';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
function page() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
    };
  return (
    <div>
        <UserProfileMenu/>
    </div>
  )
}

export default page