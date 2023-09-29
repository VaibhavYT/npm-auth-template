"use client"
import { useState } from "react";
import Image from "next/image";

export default function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <main className="">
      <div
        id="login-box"
        className={`absolute top-1/2 left-1/2 w-400 login-box box-border rounded-xl transform -translate-x-1/2 -translate-y-1/2`}
      >
        <h2 className="text-center mb-30 text-white">Login Form</h2>
        <form action="">
          <div id="user-box" className="relative">
            <label
              htmlFor=""
              className={`absolute py-2.5 px-0 text-base text-white pointer-events-none transition-duration-500 ${
                username ? "-top-5 left-0 text-sm text-cyan-500" : ""
              }`}
            >
              Username
            </label>
            <input
              type="text"
              required
              value={username}
              onChange={handleUsernameChange}
              className="w-full py-2.5 px-0 text-base text-white mb-30 rounded-none border-b border-white outline-none bg-transparent"
            />
          </div>
          <div id="password-box" className="relative">
            <label
              htmlFor=""
              className={`absolute py-2.5 px-0 text-base text-white pointer-events-none transition-duration-500 ${
                password ? " -top-5 left-0 text-sm text-cyan-500" : ""
              }`}
            >
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={handlePasswordChange}
              className="w-full py-2.5 px-0 text-base text-white mb-30 rounded-none border-b border-white outline-none bg-transparent"
            />
          </div>
          <a href="#">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </a>
        </form>
      </div>
    </main>
  );
}
