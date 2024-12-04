import React from "react";
import Link from "next/link"; // Import Link from Next.js
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { DashboardFaqCounter, FaqType, GetFaq } from "@/actions/faq/dashboard";
import { answer, faq } from "@prisma/client";

type Params = Promise<{ slug: string }>;
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

interface PageProps {
  params: Params;
  searchParams: SearchParams;
}

export default async function Page(props: PageProps) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const queryType = searchParams.queryType as FaqType;

  const fetchedFaq: faq[] = (await GetFaq(queryType)) || []; // Explicitly type fetchedFaq
  const {
    allQuestions,
    answeredQuestions,
    unPublishedQuestions,
    rejectedQuestions,
    needAnswerQuestions,
  } = await DashboardFaqCounter();

  return (
    <div className="flex flex-col gap-4" dir="ltr">
      <h1 className="text-2xl font-bold">
        Questions:{" "}
        <span className="text-greenColor capitalize bg-muted border border-greenColor/20 rounded-md px-2 py-1">
          {queryType}
        </span>
        {" / "}
        <span className="text-yellowColor capitalize bg-muted border border-yellowColor/20 rounded-md px-2 py-1">
          {fetchedFaq.length}
        </span>
      </h1>

      <div className="flex flex-wrap gap-4 justify-center">
        {fetchedFaq.map((item) => (
          <QuestionCard item={item} key={item.id} />
        ))}
      </div>
    </div>
  );
}

interface QuestionCardProps {
  item: faq & { answers?: answer[]; tagged?: { id: string; tag: string }[] }; // Update type for tagged
}

const QuestionCard: React.FC<QuestionCardProps> = React.memo(({ item }) => {
  const tags = item.tagged || [];

  return (
    <Card className="max-w-sm min-w-sm w-full">
      <CardHeader>
        <div className="flex items-center justify-between w-full flex-col ">
          {item.rejected && (
            <>
              <p className="text-xs bg-greenColor/50 w-fit rounded-md p-2 self-start">
                Rejected Because
              </p>
              <p className="text-xs bg-destructive/50 w-full rounded-md p-2">
                {item.rejectedReason ? (
                  item.rejectedReason
                ) : (
                  <span className="bg-gray-900 p-1 rounded">No reason</span>
                )}
              </p>
            </>
          )}
        </div>
        {item.tagged && item.tagged.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map(({ id, tag }) => {
              return (
                <p className="text-xs" key={id}>
                  #{tag}
                </p>
              );
            })}
          </div>
        )}
        <CardTitle>{item.question}</CardTitle>
      </CardHeader>
      {item.answers && item.answers.length > 0 ? (
        <CardContent className="flex flex-col gap-2">
          {item.answers.map((answer) => (
            <p
              className="bg-greenColor/10 rounded-md p-2 text-xs"
              key={answer.id}
            >
              {answer.content}
            </p>
          ))}
        </CardContent>
      ) : (
        <CardContent>
          <p className="text-center bg-greenColor/20 rounded-md">
            No answers yet
          </p>
        </CardContent>
      )}
      <CardFooter className="flex flex-col gap-4 justify-between">
        <Link
          href={`/dashboard/quastion/${item.id}`}
          className="bg-greenColor/50 rounded-md p-2 w-full text-center"
        >
          Update
        </Link>
      </CardFooter>
    </Card>
  );
});

// Server-side rendering function
