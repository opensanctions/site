"use client";

import { useSession } from "next-auth/react";

export const User = () => {
  const { data: session, status } = useSession();

  if (status === "authenticated") {
    return (
      <>
        <h1>Hello, {session?.user?.name}!</h1>
      </>
    );
  } else {
    return (
      <>
        <h1>You're not sign in!</h1>
      </>
    )
  }
};
