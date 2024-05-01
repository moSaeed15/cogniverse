"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";

const WelcomeCard = () => {
  const { status, data: session } = useSession();

  if (status === "loading") return null;

  return (
    <div className="flex bg-welcome rounded-3xl p-7">
      <div className="flex flex-col gap-3 text-light-grey">
        <span className="text-sm">Welcome back,</span>
        <h2 className="text-white text-2xl">
          {status === "authenticated" &&
            session.user?.name?.replace(/\b\w/g, function (char: string) {
              return char.toUpperCase();
            })}
        </h2>
        <p className="text-base">
          Glad to see you again! You are Viewing Electrical Forest statistics
        </p>
        <span className="font-bold ">Level One</span>
      </div>

      <Image src="/Spark.webp" alt="" width={300} height={300} priority />
    </div>
  );
};

export default WelcomeCard;
