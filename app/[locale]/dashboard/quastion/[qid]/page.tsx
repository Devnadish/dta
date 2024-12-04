import { GetFaqById } from "@/actions/faq/faq";
import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { faq } from "@prisma/client"; // Import the Prisma types
import Published from "@/components/dashboard/quastion/Published";
import AddTag from "@/components/dashboard/quastion/AddTag";
import AddAnswere from "@/components/dashboard/quastion/AddAnswer";
import AnswerList from "./_component/AnswerList";
import FaqHeader from "./_component/FaqHeader";
import RejectionStatus from "./_component/RejectionStatus";
import { FaqItem } from "@/type/types";

// New component for rendering rejection status

async function page({ params }: { params: { qid: string } }) {
  const { qid } = await params; // No need for await here
  const item: FaqItem | null = await GetFaqById(qid); // Use the defined type

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="w-full flex flex-row items-center justify-between gap-4 bg-foreground/50 p-2 rounded-lg shadow-md">
        <AddAnswere QID={item?.id ?? ""} Question={item?.question ?? ""} />
        <AddTag
          QID={item?.id ?? ""}
          existingTags={item?.tagged?.map((tag) => tag.tag) || []}
        />
        <Published
          publishedFlag={item?.published ?? false}
          QID={item?.id ?? ""}
        />
      </div>

      <RejectionStatus item={item} />

      <Card className="w-full">
        {item ? <FaqHeader item={item} /> : <p>Loading...</p>}
        {item && item.answers && item.answers.length > 0 ? (
          <AnswerList answers={item.answers} QID={item.id ?? ""} />
        ) : (
          <CardContent>
            <p className="text-center bg-greenColor/20 rounded-md">
              No answers yet
            </p>
          </CardContent>
        )}
        <CardFooter className="flex flex-col gap-4 justify-between"></CardFooter>
      </Card>
    </div>
  );
}

export default page;
