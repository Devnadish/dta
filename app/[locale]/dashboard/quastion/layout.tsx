import { DashboardFaqCounter, FaqType } from "@/actions/faq/dashboard";
import Link from "next/link";
import React from "react";
interface QueryLinkProps {
  queryType: FaqType; // Ensure queryType is of type FaqType
  count: number;
  children: React.ReactNode; // Specify children as ReactNode
}

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = async ({
  children,
}) => {
  const {
    allQuestions,
    answeredQuestions,
    unPublishedQuestions,
    rejectedQuestions,
    needAnswerQuestions,
  } = await DashboardFaqCounter();
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-orange-300 text-white p-2 flex flex-row justify-between rounded-md">
        <QueryLink queryType="all" count={allQuestions}>
          All
        </QueryLink>
        <QueryLink queryType="needAnswer" count={needAnswerQuestions}>
          Need Answer
        </QueryLink>
        <QueryLink queryType="answered" count={answeredQuestions}>
          Answered
        </QueryLink>
        <QueryLink queryType="rejected" count={rejectedQuestions}>
          Rejected
        </QueryLink>
        <QueryLink queryType="notPublished" count={unPublishedQuestions}>
          Not Published
        </QueryLink>
      </header>
      <main className="flex-grow p-4">{children}</main>
    </div>
  );
};

export default DashboardLayout;

const QueryLink: React.FC<QueryLinkProps> = ({
  queryType,
  count,
  children,
}) => (
  <Link
    href={`/dashboard/quastion?queryType=${queryType}`}
    className="flex items-center gap-2 bg-muted p-2 rounded-md hover:bg-gray-700"
    aria-label={`View ${queryType} questions`}
  >
    {children}
    <span className="text-xs border border-yellowColor font-bold w-6 text-center text-foreground rounded-md ">
      {count}
    </span>
  </Link>
);
