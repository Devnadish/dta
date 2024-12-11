import { getUserProfile } from "@/actions/user/user";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import StatisticsBox from "./_component/StatisticsBox";
import UserInfoBox from "./_component/UserInfoBox";
import ProfileAvatar from "./_component/ProfileAvatar";
import UserQuastion from "./_component/UserQuastion";
import LogingOut from "./_component/LogingOut";

export const dynamic = "force-dynamic";

export default async function Page({
  params,
}: {
  params: Promise<{ userid: string }>;
}) {
  const { userid } = await params;
  const userProfile = await getUserProfile(userid);

  if (!userProfile.userHistory) {
    return <div>User not found</div>;
  }

  const {
    userHistory,
    QuestionsWithAnswers,
    PendingQuestions,
    RejectedQuestions,
  } = userProfile;
  const currentBalance =
    (userHistory?.initailBalance ?? 0) - (userHistory?.usedBalance ?? 0);

  return (
    <div className="flex flex-col flex-wrap items-center justify-center w-full gap-2">
      <ProfileAvatar
        src={userHistory?.image ?? undefined}
        name={userHistory?.name ?? undefined}
      />
      <LogingOut />
      <UserInfoBox userHistory={userHistory} currentBalance={currentBalance} />
      <StatisticsBox
        QuestionsWithAnswers={QuestionsWithAnswers}
        PendingQuestions={PendingQuestions}
        RejectedQuestions={RejectedQuestions}
      />
      <UserQuastion QuestionsWithAnswers={QuestionsWithAnswers} />
    </div>
  );
}

