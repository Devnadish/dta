import { answer, comment } from "@prisma/client";
import UserInformation from "@/components/UserInformaton";
import CreateAndUpdateDate from "@/components/faq/quastion/CreateAndUpdateDate";
import Comments from "./Comments";

const Answers = ({
  answer,
  userEmail,
  slug,
}: {
  answer?: answer[];
  userEmail: string;
  slug: string;
}) => {
  if (!answer) return null;

  return (
    <div className="flex flex-col gap-2 w-full  items-end ">
      {answer.map((item) => {
        return (
          <div
            key={item.id}
            className="flex flex-col items-baseline  gap-2 w-[97%] bg-foreground/5 p-4 rounded-md  "
          >
            <CreateAndUpdateDate
              createdAt={item.createdAt}
              updatedAt={item.updatedAt}
            />
            <div className="flex flex-col gap-2 w-full ">
              <UserInformation email={item.userEmail} showName={false} />
              <div className="flex flex-col gap-2 w-full ">
                <p className="text-sm text-muted-foreground text-wrap">
                  {item.content}
                </p>
                <Comments
                  // comments={item?.comments}
                  answerId={item.id}
                  userEmail={userEmail}
                  item={item}
                  slug={slug}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default Answers;
