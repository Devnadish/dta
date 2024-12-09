import ShowQuastion from "@/components/faq/quastion/ShowQuastion";
import { faq } from "@prisma/client";

function UserQuastion({
  QuestionsWithAnswers,
}: {
  QuestionsWithAnswers: faq[];
}) {
  return (
    <div className="flex flex-col gap-2 w-full ">
      {QuestionsWithAnswers.map((item) => {
        return <ShowQuastion item={item} key={item.id} />;
      })}
      {/* <AnsweredQuestions answeredQuestions={QuestionsWithAnswers} /> */}
    </div>
  );
}

export default UserQuastion;
