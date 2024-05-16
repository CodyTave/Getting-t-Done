"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setErrorMessage("Please fill all the fields");
      return;
    }
    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: username, password }),
      });
      const data = await response.json();
      // setIsLoading(false);
      if (response.status !== 201) {
        setErrorMessage(data.message);
        setIsLoading(false);
      } else {
        router.push("/");
      }
    } catch (error) {
      setIsLoading(false);
      setErrorMessage(
        "An error occurred while logging in. Please try again later."
      );
      console.error("Login error:", error);
    }
  };

  return (
    <main className="w-full h-screen grid lg:grid-cols-2 justify-items-center items-center ">
      <div className="bg-orange-500/20 w-full h-full flex justify-center items-center">
        <Image
          priority
          className="w-28 mx-auto"
          src="/logo.png"
          alt="logo"
          sizes="100%"
          width={0}
          height={0}
        />
      </div>

      <div className="max-w-sm w-full text-gray-600">
        <div className="text-center">
          <div className="mt-5 space-y-2 ">
            <h3 className="text-gray-800 font-bold text-2xl">Welcome Back!</h3>
          </div>
        </div>
        <form onSubmit={handleLogin} className="mt-8 space-y-5">
          <div>
            <label className="font-medium">Username</label>
            <input
              placeholder="Please enter your username"
              type="username"
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
          <button
            type="submit"
            disabled={isLoading}
            className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
          >
            {isLoading ? "Logging In..." : "Login"}
          </button>
          <div className="text-center">
            <span>{"Don't have an account yet?"} </span>
            <Link className="text-indigo-800 font-semibold" href="/singup">
              Sign Up
            </Link>
          </div>
          <button className="w-full px-4  text-indigo-600 rounded-lg duration-150"></button>
          {errorMessage && (
            <p className="text-red-0 bg-red-0/10 rounded-md py-2 text-center">
              {errorMessage}
            </p>
          )}
        </form>
      </div>
    </main>
  );
}
