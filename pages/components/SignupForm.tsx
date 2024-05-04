"use client";
import PasswordRules from "@/pages/components/PasswordRules";
import React, { useState } from "react";

import hide from "@/public/svg/hide.svg";
import show from "@/public/svg/show.svg";

import {
  calculatePasswordStrength,
  generateStrongPassword,
} from "@/utils/passwordUtils";
import { Progress } from "@radix-ui/themes";
import Image from "next/image";

function SignupForm({ setName }: { setName: (name: string) => void }) {
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isPasswordMatch, setIsPasswordMatch] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [strength, setStrength] = useState<[number, number]>([0, 0]);
  const maxStrength = 128;

  //handle setName
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
    const [entropy, years] = calculatePasswordStrength(newPassword);
    setStrength([entropy, years]);
  };

  const calculateStrengthPercentage = (entropy: number) => {
    return Math.min((entropy / maxStrength) * 100, 100);
  };

  const handleGeneratePassword = () => {
    const newGeneratedPassword = generateStrongPassword();
    setPassword(newGeneratedPassword);
    setPasswordConfirm(newGeneratedPassword); // Set both passwords to the generated one
    setIsPasswordMatch(true); // They will match as they are the same
    const [entropy, years] = calculatePasswordStrength(newGeneratedPassword);
    setStrength([entropy, years]);
  };

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
          onChange={handleNameChange}
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
            <div className="relative flex gap-2">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
                className=" w-full mb-3 rounded px-3 py-6 bg-secondaryThree text-white mt-2 placeholder:text-white placeholder-opacity-50 focus:outline-none focus:border-l-4 focus:border-primary transition-all ease-in"
              />

              {showPassword ? (
                <Image
                  src={show}
                  alt="hide"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute cursor-pointer w-5 h-5 top-1/2 right-5 transform -translate-y-1/2"
                />
              ) : (
                <Image
                  src={hide}
                  alt="hide"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute cursor-pointer w-5 h-5 top-1/2 right-5 transform -translate-y-1/2"
                />
              )}
            </div>

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

          <div className="relative">
            <input
              type={showPasswordConfirm ? "text" : "password"}
              placeholder="Confirm Password"
              value={passwordConfirm}
              onPaste={(e) => e.preventDefault()}
              onChange={(e) => handlePasswordMatch(e)}
              className="w-full mb-3 rounded px-3 py-6 bg-secondaryThree text-white mt-2 placeholder:text-white placeholder-opacity-50 focus:outline-none focus:border-l-4 focus:border-primary transition-all ease-in"
            />

            {showPasswordConfirm ? (
              <Image
                src={show}
                alt="hide"
                onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                className="absolute cursor-pointer w-5 h-5 top-1/2 right-5 transform -translate-y-1/2"
              />
            ) : (
              <Image
                src={hide}
                alt="hide"
                onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                className="absolute cursor-pointer w-5 h-5 top-1/2 right-5 transform -translate-y-1/2"
              />
            )}
          </div>
        </div>

        <div className="w-full flex gap-5">
          <button
            type="submit"
            className="text-secondaryTwo font-bold bg-primary py-2 w-5/12 rounded shadow-primary shadow-lg hover:shadow-primary hover:shadow-2xl transition-all duration-300 ease-in cursor-pointer"
          >
            Signup
          </button>
          <button
            type="button"
            className="bg-secondary px-2 rounded"
            onClick={handleGeneratePassword}
          >
            Generate Password
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignupForm;
