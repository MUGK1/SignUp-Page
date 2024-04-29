import { Raleway } from "next/font/google";
import Image from "next/image";

import SignupForm from "@/pages/components/SignupForm";
import mountains from "../public/images/mountain.jpg";

const raleWay = Raleway({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen bg-secondaryTwo text-white ${raleWay.className}`}
    >
      <div className="w-6/12 my-20 mx-9">
        <h1 className="font-bold text-6xl">Welcome To Test!</h1>
        <p className="py-2 px-2">Hello Welcome to test signup page</p>
        <SignupForm />
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
