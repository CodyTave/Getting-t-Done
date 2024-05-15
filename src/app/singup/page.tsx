"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password || !confirmPassword) {
      setErrorMessage("Please fill all fields");
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }
    setIsLoading(true);
    setErrorMessage("");
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      // setIsLoading(false); //just for having the redirect as loading ending indicator 7sn for UX i think
      if (response.status !== 201) {
        setErrorMessage(data.message);
      } else {
        router.push("/login");
      }
    } catch (error) {
      setIsLoading(false);
      setErrorMessage(
        "An error occurred during sign-up. Please try again later."
      );
      console.error(error);
    }
  };
  return (
    <main className="w-full h-screen grid lg:grid-cols-2 justify-items-center items-center ">
      <div className="bg-orange-500/20 w-full h-full flex justify-center items-center">
        <Image
          className="w-28 mx-auto"
          src="/logo.png"
          alt="logo"
          sizes="100%"
          width={0}
          height={0}
        />
      </div>
      <div className="max-w-sm w-full text-gray-600">
        <h3 className="text-center text-2xl font-bold text-gray-800 mt-5">
          Sign Up
        </h3>
        <form onSubmit={handleSignUp} className="mt-8 space-y-5">
          <div>
            <label className="font-medium">Username</label>
            <input
              placeholder="Please enter your username"
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
            />
          </div>
          <div>
            <label className="font-medium">Password</label>
            <input
              placeholder="Please enter your password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
            />
          </div>
          <div>
            <label className="font-medium">Confirm Password</label>
            <input
              placeholder="Confirm your password"
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg"
          >
            {isLoading ? "Signing Up..." : "Sign Up"}
          </button>
          <div className="text-center">
            <span>Already have an account? </span>
            <Link className="text-indigo-800 font-semibold" href="/login">
              Log In
            </Link>
          </div>

          {errorMessage && (
            <p className="text-red-500 bg-red-100 rounded-md py-2 text-center">
              {errorMessage}
            </p>
          )}
        </form>
      </div>
    </main>
  );
}
