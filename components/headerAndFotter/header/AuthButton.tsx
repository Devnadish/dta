import React from "react";

import Link from "next/link";

import { getLocale, getTranslations } from "next-intl/server";
import Image from "next/image";
import { signIn, auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { GetUserByEmail } from "@/actions/user/user";

async function AuthButton() {
  const session = await auth();
  const locale = await getLocale();
  return (
    <div className=" flex items-center justify-center  ">
      {session?.user ? (
        <AuthDetails
          userName={session?.user?.name || ""}
          userImage={session?.user?.image || "/default-avatar.png"}
          userEmail={session?.user?.email || ""}
          locale={locale}
        />
      ) : (
        // <Link href={`${locale}/auth/login`}>login</Link>
        <SignInButton />
      )}
    </div>
  );
}

export default AuthButton;

const AuthDetails = async ({
  userName,
  userImage,
  locale,
  userEmail,
}: {
  userName: string;
  userImage: string;
  userEmail: string;
  locale: string;
}) => {
  try {
    const userInfo = await GetUserByEmail(userEmail);
    if (!userInfo) {
      throw new Error("User not found");
    }
    return (
      <Link href={`/${locale}/user/${userInfo?.id}`} className="cursor-pointer">
        <Image src={userImage} alt={userName} width={34} height={34} priority />
      </Link>
    );
  } catch (error) {
    console.error("Error fetching user info:", error);
    return <span>Error loading user details</span>; // Fallback UI
  }
};

export async function SignInButton() {
  const t = await getTranslations("login");

  return (
    <form
      action={async () => {
        "use server";
        await signIn("google");
      }}
    >
      <Button
        variant={"outline"}
        type="submit"
        className="text-sm font-normal font-tajawalLight"
      >
        {t("login")}
      </Button>
    </form>
  );
}
