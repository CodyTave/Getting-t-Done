"use client";

import { useState } from "react";
import Logo from "@/assets/extra/Logo";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
      setIsLoading(false);
      if (response.status !== 201) {
        setErrorMessage(data.message);
      } else {
        console.log("Login successful:", data);
      }
    } catch (error) {
      setIsLoading(false);
      setErrorMessage(
        "Une erreur est survenue. Veuillez reessayer Ulterrieurement."
      );
      console.error("Login error:", error);
    }
  };

  return (
    <main className="w-full h-screen flex flex-col items-center justify-center px-4">
      <div className="max-w-sm w-full text-gray-600">
        <div className="text-center">
          <Logo className="mx-auto w-24" />
          <div className="mt-5 space-y-2">
            <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">
              Connectez-vous à votre compte
            </h3>
            {errorMessage && <p className="text-red-0">{errorMessage}</p>}
          </div>
        </div>
        <form onSubmit={handleLogin} className="mt-8 space-y-5">
          <div>
            <label className="font-medium">Nom d'utilisateur</label>
            <input
              type="username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
            />
          </div>
          <div>
            <label className="font-medium">Mot de Passe</label>
            <input
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
            {isLoading ? "Connexion en cours..." : "Se Connecter"}
          </button>
        </form>
      </div>
    </main>
  );
}
