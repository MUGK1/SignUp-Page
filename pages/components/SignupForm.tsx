"use client";
import PasswordRules from "@/pages/components/PasswordRules";
import { useState } from "react";

import { Progress } from "@radix-ui/themes";

function SignupForm() {
  const [password, setPassword] = useState("");

  return (
    <div className="mt-4">
      <PasswordRules password={password} />
      <form className="w-8/12 mt-10 flex flex-col justify-start items-start">
        <input
          type="text"
          placeholder="Full Name"
          className="w-full px-3 rounded py-6 bg-secondaryThree text-white mt-2 placeholder:text-white placeholder-opacity-50 focus:outline-none focus:border-l-4 focus:border-primary transition-all ease-in"
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full px-3 rounded py-6 bg-secondaryThree text-white mt-2 placeholder:text-white placeholder-opacity-50 focus:outline-none focus:border-l-4 focus:border-primary transition-all ease-in"
        />
        <div className="w-full mb-10">
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-3 rounded px-3 py-6 bg-secondaryThree text-white mt-2 placeholder:text-white placeholder-opacity-50 focus:outline-none focus:border-l-4 focus:border-primary transition-all ease-in"
          />
          <div className="">
            <Progress value={75} color="orange" />
            <p className="text-right mt-1">Too Short</p>
          </div>
        </div>

        <button className=" text-secondaryTwo font-bold bg-primary py-2 w-5/12 rounded shadow-primary shadow-lg hover:shadow-primary hover:shadow-2xl transition-all duration-300 ease-in cursor-pointer">
          Signup
        </button>
      </form>
    </div>
  );
}

export default SignupForm;
