import { auth } from "@/auth";
import React from "react";
import AddFaq from "@/components/faq/AddFaq";

import { getTranslations } from "next-intl/server";
import MustLogin from "@/components/MustLogin";
import NavLinks from "./_component/NavLinks";
import { FaqCounter } from "@/actions/faq/faq";

const Footer = ({ userData }: { userData: any }) => {
  return (
    <footer className="fixed bottom-0 left-0 w-full p-4 bg-secondary border-t-2 border-yellowColor h-14 flex justify-center items-center">
      {userData ? <AddFaq user={userData} /> : <MustLogin />}
    </footer>
  );
};

// New FAQSection component
const FAQSection = ({
  t,
  user,
  answered,
  pending,
  rejected,
}: {
  t: any;
  user: any;
  answered: any;
  pending: any;
  rejected: any;
}) => {
  return (
    <>
      <div className="flex flex-col md:flex-row gap-4 w-full justify-between">
        <WelcomeMessage t={t} user={user} />
        <NavLinks answered={answered} pending={pending} rejected={rejected} />
      </div>
      <h3 className="text-xs sm:text-sm text-muted-foreground font-cairo mb-4 flex items-center justify-end w-full">
        {t("Faq.notPerfect")}
      </h3>
    </>
  );
};

const WelcomeMessage = ({ t, user }: { t: any; user: any }) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row gap-2 md:items-end md:justify-start">
        <h1 className="text-sm md:text-2xl font-bold font-cairo">
          {t("Faq.pagetitle")}
        </h1>
        {user ? (
          <p className="text-foreground/80 font-cairo text-xs">
            {t("Faq.welcome")} {user.name}
          </p>
        ) : (
          <MustLogin />
        )}
      </div>
    </div>
  );
};

const fetchFaqData = async (locale: string) => {
  const t = await getTranslations();
  const session = await auth();
  const { answeredQuestions, pendingQuestions, rejectedQuestions } =
    await FaqCounter();

  return {
    t,
    session,
    answered: {
      name: t("Faq.answered"),
      href: `/${locale}/faq`,
      count: answeredQuestions,
    },
    rejected: {
      name: t("Faq.rejected"),
      href: `/${locale}/faq/rejected`,
      count: rejectedQuestions,
    },
    pending: {
      name: t("Faq.pending"),
      href: `/${locale}/faq/notanswered`,
      count: pendingQuestions,
    },
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

  const { t, session, answered, rejected, pending } =
    await fetchFaqData(locale);

  const userData = {
    user: session?.user,
    answeredQuestions: answered.count,
    pendingQuestions: pending.count,
    rejectedQuestions: rejected.count,
  };

  return (
    <div className="flex flex-col min-h-screen w-full gap-3">
      <FAQSection
        t={t}
        user={session?.user}
        answered={answered}
        pending={pending}
        rejected={rejected}
      />
      <main className="flex-grow w-full">{children}</main>
      <Footer userData={userData} />
    </div>
  );
};

// MustLogin component

export default DashboardLayout;
