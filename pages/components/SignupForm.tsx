"use client";
import PasswordRules from "@/pages/components/PasswordRules";
import React, { useState } from "react";

import { calculatePasswordStrength } from "@/utils/passwordUtils";
import { Progress } from "@radix-ui/themes";

function SignupForm() {
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isPasswordMatch, setIsPasswordMatch] = useState(false);
  const [strength, setStrength] = useState<[number, number]>([0, 0]);
  const maxStrength = 128;

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
    const [entropy, years] = calculatePasswordStrength(newPassword);
    setStrength([entropy, years]);
  };

  const calculateStrengthPercentage = (entropy: number) => {
    return Math.min((entropy / maxStrength) * 100, 100);
  };
  console.log(strength);

  const progressColor = () => {
    if (strength[0] < 50) {
      return "red";
    } else if (strength[0] < 90) {
      return "orange";
    } else {
      return "green";
    }
  };

  const handlePasswordMatch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordConfirm(e.target.value);
    if (password === e.target.value) {
      setIsPasswordMatch(true);
    } else {
      setIsPasswordMatch(false);
    }
  };

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
        <div
          className={`w-full mb-10 ${passwordConfirm ? "border rounded p-2 px-4" : ""} ${isPasswordMatch ? "border-green-600" : "border-red-600"}  mt-4 transition-all ease-in`}
        >
          {passwordConfirm && (
            <h2
              className={` ${isPasswordMatch ? "text-green-600" : "text-red-600"} font-bold transition-all ease-in`}
            >
              {isPasswordMatch ? "Passwords Match" : "Passwords Do Not Match"}
            </h2>
          )}

          <div>
            <input
              type="password"
              placeholder="Password"
              onChange={handlePasswordChange}
              className="w-full mb-3 rounded px-3 py-6 bg-secondaryThree text-white mt-2 placeholder:text-white placeholder-opacity-50 focus:outline-none focus:border-l-4 focus:border-primary transition-all ease-in"
            />
            <div>
              <Progress
                value={calculateStrengthPercentage(strength[0]) || 0}
                color={progressColor()}
              />
              <p className="text-right mt-1">
                <span className="text-primary font-bold">
                  {strength[0] < 50
                    ? "Weak"
                    : strength[0] < 90
                      ? "Medium"
                      : strength[0] < 300
                        ? "Strong"
                        : "Weak"}
                </span>
              </p>
            </div>
          </div>

          <div>
            <input
              type="password"
              placeholder="Confirm Password"
              onChange={(e) => handlePasswordMatch(e)}
              className="w-full mb-3 rounded px-3 py-6 bg-secondaryThree text-white mt-2 placeholder:text-white placeholder-opacity-50 focus:outline-none focus:border-l-4 focus:border-primary transition-all ease-in"
            />
          </div>
        </div>

        <button className="text-secondaryTwo font-bold bg-primary py-2 w-5/12 rounded shadow-primary shadow-lg hover:shadow-primary hover:shadow-2xl transition-all duration-300 ease-in cursor-pointer">
          Signup
        </button>
      </form>
    </div>
  );
}

export default SignupForm;
