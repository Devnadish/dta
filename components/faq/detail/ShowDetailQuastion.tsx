import { faq, answer, tagged, comment } from "@prisma/client";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import ViewerCounter, {
  DislikeCounter,
  LoveItConter,
} from "../quastion/ViewerCounter";
import TagList from "../quastion/TagList";
import CreateAndUpdateDate from "../quastion/CreateAndUpdateDate";
import UserInformation from "@/components/UserInformaton";
import Answers from "./Answers";

interface FaqWithAnswers extends faq {
  answers?: answer[];
  tagged?: tagged[];
  comments?: comment[];
}

function ShowDetailQuastion({
  item,
  userEmail,
  slug,
}: {
  item: FaqWithAnswers;
  userEmail: string;
  slug: string;
}) {
  return (
    <Card>
      <CardHeader
        className="flex flex-row items-center justify-between w-full  
       min-h-[40px] bg-secondary "
      >
        <div className="flex flex-col  gap-2 items-start   w-full">
          <Q quastion={item?.question} auther={item?.userEmail} />
          <div className="flex flex-row items-center gap-3 ">
            <LoveItConter
              loveCount={item?.loveCount ?? 0}
              slug={item?.slug ?? ""}
              userEmail={userEmail}
            />
            <DislikeCounter
              dislovCount={item?.dislovCount ?? 0}
              slug={item?.slug ?? ""}
              userEmail={userEmail}
            />
          </div>
        </div>

        <div className="flex flex-row items-center gap-3">
          <ViewerCounter
            viewerCount={item?.viewerCount}
            loveCount={item?.loveCount ?? 0}
            dislikeCount={item?.dislovCount ?? 0}
          />
        </div>
      </CardHeader>

      <CardContent className="flex flex-col items-start justify-between w-full p-4 gap-4">
        <div className="flex flex-row items-center justify-between w-full">
          <TagList tags={item?.tagged?.map((tag) => tag.tag)} />
          <CreateAndUpdateDate
            createdAt={item?.createdAt}
            updatedAt={item?.updatedAt}
          />
        </div>
        <Answers answer={item?.answers} userEmail={userEmail} slug={slug} />
      </CardContent>
    </Card>
  );
}

export default ShowDetailQuastion;

const Q = ({ quastion, auther }: { quastion: string; auther: string }) => {
  return (
    <div className="flex flex-row items-center gap-2 w-full  ">
      <UserInformation email={auther ?? ""} showName={false} />
      <p className="text-sm font-semibold text-foreground ">{quastion}</p>
    </div>
  );
};
