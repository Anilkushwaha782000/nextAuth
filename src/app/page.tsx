"use client"
import React,{ useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();
  // if (session) {
  // }
  return (
   <div>
      <section className="bg-blue-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Collaborate and Manage Your Tasks Efficiently
          </h2>
          <p className="text-base sm:text-lg mb-8">
            Stay organized, assign tasks, and track progress with your team in real-time.
          </p>
          <Link
            href="/homepage"
            className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold shadow hover:bg-gray-100 transition"
          >
            Get Started
          </Link>
        </div>
      </section>

      
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl sm:text-3xl font-semibold mb-8">Features</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 shadow-lg rounded-lg">
              <h4 className="text-lg sm:text-xl font-semibold mb-2">Task Assignment</h4>
              <p className="text-gray-600">
                Easily assign tasks to team members and monitor their progress.
              </p>
            </div>
            <div className="bg-white p-6 shadow-lg rounded-lg">
              <h4 className="text-lg sm:text-xl font-semibold mb-2">Real-time Updates</h4>
              <p className="text-gray-600">
                Keep everyone on the same page with instant updates on task status.
              </p>
            </div>
            <div className="bg-white p-6 shadow-lg rounded-lg">
              <h4 className="text-lg sm:text-xl font-semibold mb-2">Collaboration Tools</h4>
              <p className="text-gray-600">
                Collaborate with your team through chat, comments, and notifications.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-100 py-12">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-xl sm:text-2xl font-semibold mb-4">
            Ready to boost your team's productivity?
          </h3>
          <Link
            href="/homepage"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold shadow hover:bg-blue-700 transition"
          >
            Start Now
          </Link>
        </div>
      </section>
   </div>
  );
}
