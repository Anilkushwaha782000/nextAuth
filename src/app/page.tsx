"use client"
import React,{ useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();
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
            href="/onboarding"
            className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold shadow hover:bg-gray-100 transition"
          >
            Get Started
          </Link>
        </div>
      </section>

            {/* Key Features Section */}
            <section className="py-12 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-semibold text-center mb-8">
            Why Choose TaskFlow?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-6 border rounded-lg text-center hover:shadow-lg transition duration-300">
              <div className="text-indigo-600 text-6xl mb-4">
                🧑‍🤝‍🧑
              </div>
              <h3 className="text-xl font-semibold mb-2">Collaborate Easily</h3>
              <p className="text-gray-600">
                Share tasks with your team and work together in real-time. 
                Manage assignments and stay in sync.
              </p>
            </div>
            {/* Feature 2 */}
            <div className="p-6 border rounded-lg text-center hover:shadow-lg transition duration-300">
              <div className="text-indigo-600 text-6xl mb-4">
                📆
              </div>
              <h3 className="text-xl font-semibold mb-2">Stay Organized</h3>
              <p className="text-gray-600">
                Use our intuitive Kanban board to manage your tasks with ease, 
                move tasks between stages effortlessly.
              </p>
            </div>
            {/* Feature 3 */}
            <div className="p-6 border rounded-lg text-center hover:shadow-lg transition duration-300">
              <div className="text-indigo-600 text-6xl mb-4">
                🔔
              </div>
              <h3 className="text-xl font-semibold mb-2">Real-time Notifications</h3>
              <p className="text-gray-600">
                Receive instant notifications about task updates, deadlines, 
                and comments to stay on top of your work.
              </p>
            </div>
          </div>
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
      <section className="bg-indigo-600 text-white py-12">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-semibold mb-4">Start Collaborating Today</h2>
          <p className="text-lg mb-6">
            TaskFlow is the perfect tool for teams looking to boost productivity and stay organized.
          </p>
          <Link href="/signup">
            <p className="px-8 py-4 bg-white text-indigo-600 font-semibold rounded-lg shadow-lg hover:bg-gray-100 transition duration-300">
              Sign Up for Free
            </p>
          </Link>
        </div>
      </section>
      <section className="bg-gray-100 py-12">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-xl sm:text-2xl font-semibold mb-4">
            Ready to boost your team&apos;s  productivity?
          </h3>
          <Link
            href="/task"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold shadow hover:bg-blue-700 transition"
          >
            Start Now
          </Link>
        </div>
      </section>
   </div>
  );
}
