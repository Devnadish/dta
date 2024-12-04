import { QIcon, ReplayIcon } from "../icons/QIcon";
import FaqHeaderInformation from "./FaqHeaderInformation";

import { Card, CardContent } from "@/components/ui/card";
const AnsweredQuestions = ({
  answeredQuestions,
}: {
  answeredQuestions: any[];
}) => (
  <div className="flex flex-col gap-4">
    {answeredQuestions.map((item) => (
      <Card key={item.id}>
        <CardContent className="p-2 w-full">
          <FaqHeaderInformation item={item} />
          <div className=" text-sm mt-1 font-semibold text-foreground w-full flex items-center justify-start gap-2">
            <QIcon
              width={20}
              height={20}
              className="text-primary rounded-md p-[1px]"
            />
            {item.question}
          </div>
          <ShowTags item={item} />

          <div className="p-2">
            {item.answers.length > 0 &&
              item.answers.map((answer: any, index: number) => (
                <AnswerItem key={index} answer={answer} />
              ))}
          </div>
        </CardContent>
      </Card>
    ))}
  </div>
);

const ShowTags = ({ item }: { item: any }) => {
  const faqTags: { id: string; tag: string }[] = item.tagged;
  return (
    <div className="flex flex-row gap-2 items-center justify-start flex-wrap">
      {faqTags.map((tag: { id: string; tag: string }) => (
        <p
          className="text-xs underline capitalize text-foreground "
          key={tag.id}
        >
          {tag.tag}
        </p>
      ))}
    </div>
  );
};

const AnswerItem = ({ answer }: { answer: any }) => (
  <div className="flex flex-row justify-end w-full">
    <div className="text-sm  text-foreground/70 w-full flex items-center justify-start gap-2 p-2 mr-2 md:mr-8">
      <ReplayIcon
        width={18}
        height={20}
        className=" rounded-md p-[1px] text-greenColor"
      />
      {answer.content}
    </div>
  </div>
);

export default AnsweredQuestions;
