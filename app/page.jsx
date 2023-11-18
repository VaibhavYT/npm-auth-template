"use client"
import { useState } from "react";
import Image from "next/image";
import axios from "axios";
export default function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const [usernameFocused, setUsernameFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);


  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/",{
          email,
          username,
          password,
        }
      );
     
      if (response.status === 201) {
       
        console.log("User created successfully");
       
      } else if (response.status === 409) {
        
        
      } else {
        
        
      }
    } catch (error) {
      console.error("Error registering user:", error);
      
    }
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
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
  const handleEmailFocus = () => {
    setEmailFocused(true);
  };

  const handleEmailBlur = () => {
    if (!email) {
      setEmailFocused(false);
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
        <form action="" onSubmit={handleSubmit}>
        <div id="email-box" className="relative">
            <label
              htmlFor="email"
              className={`absolute py-2.5 px-0 text-base text-white pointer-events-none transition-transform ${
                emailFocused || email ? " -top-5 left-0 text-xs ct animate-bounce" : ""
              }`}
            >
              Email
            </label>
            <input
              id="email"
              type="text"
              required
              value={email}
              onChange={handleEmailChange}
              onFocus={handleEmailFocus}
              onBlur={handleEmailBlur}
              className="w-full py-2.5 px-0 text-base text-white mb-30 rounded-none border-b border-white outline-none bg-transparent"
            />
          </div>
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
          {/* <a type="submit" className="alink hover:aa ">
            <span className="span1"></span>
            <span className="span2"></span>
            <span className="span3"></span>
            <span className="span4  animate-bounce"></span>
            Submit
          </a> */}
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 focus:outline-none">Register</button>
        </form>
      </div>
    </main>
  );
}
