import React from "react";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="bg-white p-8 rounded-lg shadow-xl text-center max-w-md w-full mx-4">
        <h1 className="mb-6 text-4xl font-bold text-gray-800">
          Welcome to <span className="text-blue-600">Pill Pal</span>
        </h1>

        <p className="mb-8 text-gray-600">
          The solution to ADHD and planning.
        </p>

        <div className="flex flex-col space-y-4">
          <Link
            to="/login"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 transform hover:scale-105 active:scale-95"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition duration-300 transform hover:scale-105 active:scale-95"
          >
            Signup
          </Link>
        </div>
      </div>

      <footer className="mt-8 text-gray-500 text-sm">
        <p>© 2023 Your Company. All rights reserved.</p>
      </footer>
    </div>
  );
}