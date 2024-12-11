import { auth } from "@/auth";
import React from "react";
import AddFaq from "@/components/faq/AddFaq";

import { getTranslations } from "next-intl/server";
import MustLogin from "@/components/MustLogin";
import { FaqCounter } from "@/actions/faq/faq";
import Link from "next/link";
import { FluentChatAdd16Regular } from "@/components/icons/QIcon";
import ShowQuastionType, { NavLinks } from "./_component/NavLinks";

interface LinkTitle {
  pending: string;
  answered: string;
  rejected: string;
}
// New FAQSection component
const FAQSection = async ({
  user,
  answered,
  pending,
  rejected,
}: {
  user: any;
  answered: any;
  pending: any;
  rejected: any;
}) => {
  const t = await getTranslations("Faq");
  const linkTitle: LinkTitle = {
    pending: t("pending"),
    answered: t("answered"),
    rejected: t("rejected"),
  };
  // console.log(LinkTitle)

  return (
    <div className="sticky top-16 left-0 z-50 flex flex-col items-center justify-between w-full  ">
      <WelcomeMessage t={t} user={user} />

      <div className="flex flex-row gap-4 w-full justify-between  items-center p-2 rounded-lg bg-white/20 backdrop-blur-3xl shadow-lg">
        <AddquastionButton title={t("addFaq")} />

        {/* <div className="flex flex-col gap-1 justify-between "> */}
        <ShowQuastionType
          answeredQuestions={answered}
          pendingQuestions={pending}
          rejectedQuestions={rejected}
          msgHint={t("notPerfect")}
          linkTitle={linkTitle}
        />
        <div className="hidden md:flex md:flex-col w-full">
          <NavLinks
            answeredQuestions={answered}
            pendingQuestions={pending}
            rejectedQuestions={rejected}
            linkTitle={linkTitle}
          />

        </div>

      </div>
    </div>
  );
};

const AddquastionButton = ({ title }: { title: string }) => {
  return (
    <div className="min-w-36 max-w-36">
      <Link
        href="/addquastion"
        className="bg-orangeColor text-foreground hover:bg-green-600 rounded-t-lg flex items-center justify-center w-full  py-1 px-3 gap-3 font-cairo "
      >
        {" "}
        <FluentChatAdd16Regular width={24} height={24} /> {title}{" "}
      </Link>
      <div className="w-full h-1 bg-primary animate-pulse"></div>
    </div>
  );
};

const WelcomeMessage = ({ t, user }: { t: any; user: any }) => {
  return (
    <div className="self-start flex items-center justify-between w-full flex-row">
      {user ? (
        <p className="text-foreground/80 font-cairo text-xs  ">
          {t("welcome")} {user.name}
        </p>
      ) : (
        <MustLogin />
      )}
      <h3 className="hidden text-xs text-muted-foreground font-amiri  md:flex items-center">
        {t("notPerfect")}
      </h3>
    </div>
  );
};

const fetchFaqData = async (locale: string) => {
  const session = await auth();
  const { answeredQuestions, pendingQuestions, rejectedQuestions } =
    await FaqCounter();

  return {
    session,
    answeredQuestions,
    rejectedQuestions,
    pendingQuestions,
  };
};
// Update DashboardLayout component
const DashboardLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  tags: React.ReactNode;
  params: Promise<{ locale: string }>;
}) => {
  const { locale } = await params;

  const { session, answeredQuestions, rejectedQuestions, pendingQuestions } =
    await fetchFaqData(locale);

  const userData = {
    user: session?.user,
    answeredQuestions: answeredQuestions,
    pendingQuestions: pendingQuestions,
    rejectedQuestions: rejectedQuestions,
  };

  return (
    <div className="relative flex flex-col min-h-screen w-full gap-3">
      <FAQSection
        user={session?.user}
        answered={answeredQuestions}
        pending={pendingQuestions}
        rejected={rejectedQuestions}
      />
      <main className="flex-grow w-full">{children}</main>
    </div>
  );
};

// MustLogin component

export default DashboardLayout;
