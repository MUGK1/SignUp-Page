import { Raleway } from "next/font/google";
import Image from "next/image";

import SignupForm from "@/pages/components/SignupForm";
import { Metadata } from "next";
import { useState } from "react";
import mountains from "../public/images/mountain.jpg";

const raleWay = Raleway({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SignUp Page",
  description:
    "A simple signup page for a website, Cybersecurity Course Project",
};

export default function Home() {
  const [name, setName] = useState("");

  return (
    <main
      className={`flex min-h-screen bg-secondaryTwo text-white ${raleWay.className}`}
    >
      <div className="w-6/12 my-20 mx-9">
        <h1 className="font-bold text-6xl">Welcome {name || "Visitor"}!</h1>
        <p className="py-2 px-2">Hello, Welcome to our website page</p>
        <SignupForm setName={setName} />
      </div>
      <div className="w-7/12 p-4">
        <Image
          src={mountains}
          alt="Mountains"
          className="w-full h-full rounded-xl object-cover shadow-2xl filter brightness-75"
        />
      </div>
    </main>
  );
}
