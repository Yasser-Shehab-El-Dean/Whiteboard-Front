"use client";

import { signIn, signOut, useSession } from "next-auth/react";

import Image from "next/image";

export default function Home() {
  const { data: session, status } = useSession();

  console.log({ status, session });

  return (
    <>
      <h1>Whiteboard</h1>
      <button onClick={() => signOut()}>Sign Out</button>
    </>
  );
}
