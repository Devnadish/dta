import FaqHeaderInformation from "@/components/faq/FaqHeaderInformation";
import { ReplayIcon } from "@/components/icons/QIcon";
import UserInformation from "@/components/UserInformaton";
import { dateToSting } from "@/lib/nadish";
import { faq, answer, tagged } from "@prisma/client";
import { Calendar, Edit, Eye } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";

interface FaqWithAnswers extends faq {
  answers?: answer[];
  tagged?: tagged[];
}

function ShowQuastion({ item }: { item: FaqWithAnswers }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between w-full  p-1">
        <ViewerCountDisplay viewerCount={item?.viewerCount} />
        <AnswerCount AnswerCount={item?.answers?.length ?? 0} />
      </CardHeader>

      <CardContent className="flex flex-col items-start justify-between w-full px-1">
        <Q quastion={item?.question} auther={item?.userEmail} />
        <DateDisplay createdAt={item?.createdAt} updatedAt={item?.updatedAt} />
        <div className="w-full h-0.5 bg-border my-2 rounded-md"></div>
        <Answers answer={item?.answers} />
      </CardContent>
    </Card>
  );
}

export default ShowQuastion;
const Q = ({ quastion, auther }: { quastion: string; auther: string }) => {
  return (
    <div className="flex flex-row items-center gap-2 w-full ">
      <UserInformation email={auther ?? ""} showName={false} />
      <p>{quastion}</p>
    </div>
  );
};

const Answers = ({ answer }: { answer?: answer[] }) => {
  if (!answer) return null;

  return (
    <div className="flex flex-col gap-2 w-full  items-end ">
      {answer.map((item) => (
        <div
          key={item.id}
          className="flex flex-row items-baseline  gap-2 w-[97%]  "
        >
          <UserInformation email={item.userEmail} showName={false} />
          <p className="text-sm text-muted-foreground text-wrap">
            {item.content}
          </p>
        </div>
      ))}
    </div>
  );
};

const ViewerCountDisplay = ({ viewerCount }: { viewerCount: number }) => (
  <div className="rounded-md text-sm text-muted-foreground flex items-center justify-center w-9 h-5 border gap-1 px-1 bg-secondary border-border">
    <Eye className="w-3 h-3" />
    <p className="text-[10px]">{viewerCount}</p>
  </div>
);

const DateDisplay = ({
  createdAt,
  updatedAt,
}: {
  createdAt: Date;
  updatedAt: Date;
}) => (
  <div className="flex items-center  flex-row  gap-2 justify-end w-full  ">
    <div className="text-[10px]   text-muted-foreground flex items-center gap-2 ">
      <Edit className="w-3 h-3 " />
      {dateToSting(updatedAt.toString())}
    </div>
    <div className="text-[10px]   text-muted-foreground flex items-center gap-2  ">
      <Calendar className="w-3 h-3 " />
      {dateToSting(createdAt.toString())}
    </div>
  </div>

  // </div>
);

const AnswerCount = ({ AnswerCount }: { AnswerCount: number }) => {
  return (
    <div className="rounded-md text-sm text-muted-foreground flex items-center justify-center w-9 h-5 border gap-1 px-1 bg-secondary border-border">
      <ReplayIcon width={16} height={16} className="text-greenColor" />

      <p className="text-[10px]"> {AnswerCount}</p>
    </div>
  );
};
