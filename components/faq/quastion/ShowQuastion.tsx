import { faq, answer, tagged } from "@prisma/client";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import More from "./More";
import Q from "./Q";
import ViewerCounter from "./ViewerCounter";
import TagList from "./TagList";
import OneAnswer from "./Answers";
import CreateAndUpdateDate from "./CreateAndUpdateDate";

interface FaqWithAnswers extends faq {
  answers?: answer[];
  tagged?: tagged[];
}

function ShowQuastion({ item }: { item: FaqWithAnswers }) {
  return (
    <Card>
      <CardHeader
        className="flex flex-row items-center justify-between w-full  
       min-h-[40px] bg-secondary "
      >
        <Q quastion={item?.question} auther={item?.userEmail} />
        <div className="flex flex-col items-center ">
          <div className="flex flex-row items-center gap-2">
            <ViewerCounter
              viewerCount={item?.viewerCount ?? 0}
              loveCount={item?.loveCount ?? 0}
              dislikeCount={item?.dislovCount ?? 0}
            />
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col items-start justify-between w-full p-4">
        <div className="flex flex-row items-center justify-between w-full">
          <TagList tags={item?.tagged?.map((tag) => tag.tag)} />
          <CreateAndUpdateDate
            createdAt={item?.createdAt}
            updatedAt={item?.updatedAt}
          />
        </div>
        <OneAnswer answer={item?.answers} />
        <CardFooter className="flex flex-row items-center justify-end w-full">
          <More slug={item?.slug} AnswerCount={item?.answers?.length ?? 0} />
        </CardFooter>
      </CardContent>
    </Card>
  );
}

export default ShowQuastion;
