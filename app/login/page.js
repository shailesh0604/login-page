"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import connectDB from "@/db/connectDB";
import { useSession, signIn, signOut } from "next-auth/react";

const page = () => {
  const { data: session } = useSession();

  //connectDB();

  if (session) {
    return (
      <>
        Signed in as{session.user.email} <br />
        <button>sign out</button>
      </>
    );
  }
  return (
    <>
      <section className="flex justify-center items-center w-full h-screen">
        <div className="max-w-[90%] w-[25rem]">
          <div>
            <Image
              src={"/logo.svg"}
              className="invert mx-auto"
              width={70}
              height={70}
              sizes="100"
              alt="logo"
            />
          </div>
          <div className="login-title text-center mt-5 mb-6 font-semibold text-2xl">
            Log in or sign up
          </div>
          <div className="flex flex-col gap-4 ">
            <Link
              href={"/"}
              onClick={() => signIn("github")}
              className="bg-white flex justify-center items-center gap-2 text-black px-2 py-2 rounded-[4px]"
            >
              <span>
                <Image src={"/google.svg"} width={30} height={30} alt="login" />
              </span>
              <span className="font-medium text-base">
                Continue with Google
              </span>
            </Link>

            <Link
              href={"/"}
              className="bg-white flex justify-center items-center gap-2 text-black px-2 py-2 rounded-[4px]"
            >
              <span>
                <Image src={"/apple.svg"} width={30} height={30} alt="login" />
              </span>

              <span>Continue with Apple</span>
            </Link>

            <Link
              href={"/"}
              className="bg-white flex justify-center items-center gap-2 text-black px-2 py-2 rounded-[4px]"
            >
              <span>
                <Image
                  src={"/facebook.svg"}
                  width={30}
                  height={30}
                  alt="login"
                />
              </span>
              <span>Continue with Facebook</span>
            </Link>
          </div>

          <div className="opacity-60 text-center my-2">or</div>

          <div className="flex flex-col gap-3">
            <div className="">
              <input
                type="email"
                className="w-full outline-none font-medium bg-[#363636] rounded-md px-2 py-3 placeholder:text-white placeholder:opacity-80"
                placeholder="Email"
              />
            </div>
            <div className="">
              <button className="w-full font-semibold bg-white text-black px-2 py-3 rounded-md">
                Continue
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default page;
