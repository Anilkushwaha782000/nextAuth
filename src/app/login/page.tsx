"use client"
import { signIn, signOut, useSession } from 'next-auth/react';
import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';
import { Session } from 'next-auth';
import { FaGithub,FaGoogle } from 'react-icons/fa';
interface userdata {
  email: string;
  password: string;
}
function Login() {
  const [email, setEmail] = useState('');
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { data: session, status } = useSession();
  if (status === 'loading') {
    return <p>Loading...</p>;
  }
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true)
    const response = await signIn('credentials', {
      redirect: false,
      email: email,
      password: password,
    });
    setLoading(false)

    if (response?.error) {
      console.error('Login failed:', response.error);
    } else if (response?.ok) {
      // Redirect or update UI after successful login
      console.log('Login successful:', response);
      router.push('/profile'); // Example: redirect to profile page
    }
  };
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Welcome back, Please sign in!</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="you@example.com"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              required
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="••••••••"
            />
          </div>
          <button
             disabled={loading}
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {loading ? 'Signing In...' : 'Sign in'}
          </button>
        </form>
        <div className="flex items-center gap-4 mt-6">
          <span className="flex-1 border-t border-gray-600"></span>
          <span className="text-gray-600 px-4">or</span>
          <span className="flex-1 border-t border-gray-600"></span>
        </div>
        <div className="mt-6 flex gap-4">
          <button
            onClick={() => signIn('github')}
            className="w-full py-2 px-4 bg-gray-800 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 gap-2 flex items-center justify-center"
          >
            <FaGithub size={24}/> GitHub
          </button>
          <button
            onClick={() => signIn('google')}
            className="w-full py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-red-500 gap-2 flex items-center justify-center"
          >
            <FaGoogle size={24}/>Google
          </button>
        </div>
        <div className="mt-4 text-center">
          <p className="text-gray-600">
            Don&apos;t have an account? 
            <a href="/signup" className="text-blue-500 hover:underline">
              Register here
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login