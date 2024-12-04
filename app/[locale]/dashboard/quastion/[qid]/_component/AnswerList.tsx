import EditAnswer from "@/components/dashboard/answer/EditAnswer";
import DeleterAnswer from "@/components/dashboard/answer/DeleterAnswer";
import { CardContent } from "@/components/ui/card";

interface answer {
  id: string;
  content: string;
}

const AnswerList = ({ answers, QID }: { answers: answer[]; QID: string }) => (
  <CardContent className="flex flex-col gap-2">
    {answers.map((answer) => (
      <div
        className="flex justify-between gap-2 bg-muted rounded-md p-2 text-xs flex-col"
        key={answer.id}
      >
        <p className="bg-muted rounded-md p-2 text-xs">{answer.content}</p>
        <div className="flex items-center justify-end gap-2">
          <EditAnswer AID={answer.id} QID={QID} content={answer.content} />
          <DeleterAnswer AID={answer.id} QID={QID} />
        </div>
      </div>
    ))}
  </CardContent>
);

export default AnswerList;
