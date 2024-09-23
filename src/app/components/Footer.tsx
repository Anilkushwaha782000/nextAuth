"use client"
import React from 'react';
import { FaTwitter, FaLinkedin, FaFacebook,FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold text-white">
              TaskFlow
            </h2>
            <p className="mt-2 text-gray-400">
              Simplify your workflow, boost productivity, and achieve your goals.
            </p>
          </div>
          <div className="flex gap-4">
            <a
              href="https://github.com/Anilkushwaha782000"
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="Twitter"
            >
              <FaGithub className="text-2xl" />
            </a>
            <a
              href="https://www.linkedin.com/in/anil-kushwaha-843689215/"
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="text-2xl" />
            </a>
          </div>
        </div>

        <hr className="my-6 border-gray-700" />
        <div className="flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm text-gray-500">
            © 2024 TaskFlow. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <a
              href="#"
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              Privacy Policy
            </a>
            <span className="mx-2">|</span>
            <a
              href="#"
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
