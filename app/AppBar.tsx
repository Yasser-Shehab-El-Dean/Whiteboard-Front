"use client";

import Link from "next/link";
import React from "react";
import LoginButton from "./LoginButton";
import { useSession } from "next-auth/react";

const AppBar = () => {
  const { data: session } = useSession();
  console.log({ Session: session });

  return (
    <div className='bg-gradient-to-b from-cyan-50 to-cyan-200 p-2 flex gap-5 '>
      <Link href={"/"}>Home</Link>
      <p>Username : {session?.user?.email}</p>
      <img src={session?.user?.image as string | undefined} alt='' />
      <LoginButton />
    </div>
  );
};

export default AppBar;
