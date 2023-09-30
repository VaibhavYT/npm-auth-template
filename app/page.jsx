"use client"
import { useState } from "react";
import Image from "next/image";

export default function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameFocused, setUsernameFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleUsernameFocus = () => {
    setUsernameFocused(true);
  };

  const handleUsernameBlur = () => {
    if (!username) {
      setUsernameFocused(false);
    }
  };

  const handlePasswordFocus = () => {
    setPasswordFocused(true);
  };

  const handlePasswordBlur = () => {
    if (!password) {
      setPasswordFocused(false);
    }
  };

  return (
    <main className="">
      <div
        id="login-box"
        className={`absolute top-1/2 left-1/2 w-400 login-box box-border rounded-xl transform -translate-x-1/2 -translate-y-1/2 p-10`}
      >
        <h2 className="text-center mb-30 text-white">Login Form</h2>
        <form action="">
          <div id="user-box" className="relative">
            <label
              htmlFor="username"
              className={`absolute py-2.5 px-0 text-base text-white pointer-events-none transition-transform ${
                usernameFocused || username ? " -top-5 left-0 text-xs ct animate-bounce" : ""
              }`}
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              required
              value={username}
              onChange={handleUsernameChange}
              onFocus={handleUsernameFocus}
              onBlur={handleUsernameBlur}
              className="w-full py-2.5 px-0 text-base text-white mb-30 rounded-none border-b border-white outline-none bg-transparent"
            />
          </div>
          <div id="password-box" className="relative">
            <label
              htmlFor="password"
              className={`absolute py-2.5 px-0 text-base text-white pointer-events-none transition-transform ${
                passwordFocused || password ? " -top-5 left-0 text-xs ct animate-bounce" : ""
              }`}
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={handlePasswordChange}
              onFocus={handlePasswordFocus}
              onBlur={handlePasswordBlur}
              className="w-full py-2.5 px-0 text-base text-white mb-30 rounded-none border-b border-white outline-none bg-transparent"
            />
          </div>
          <a href="#" className="alink hover:aa ">
            <span className="span1"></span>
            <span className="span2"></span>
            <span className="span3"></span>
            <span className="span4  animate-bounce"></span>
            Submit
          </a>
        </form>
      </div>
    </main>
  );
}
