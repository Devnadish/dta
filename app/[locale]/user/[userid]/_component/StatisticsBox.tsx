import InfoBox from "@/components/InfoBox";

import {
  CarbonFavoriteFilled,
  IcRoundPendingActions,
  MdiBellOutline,
  MdiChatQuestionOutline,
  RiQuestionAnswerLine,
  SimpleLineIconsClose,
} from "@/components/icons/EmailIcon";

const StatisticsBox = ({
  QuestionsWithAnswers,
  PendingQuestions,
  RejectedQuestions,
}: {
  QuestionsWithAnswers: any[];
  PendingQuestions: any[];
  RejectedQuestions: any[];
}) => (
  <div className="flex flex-row border p-2 rounded-md gap-2 w-full">
    <InfoBox info={(50).toString()} icon={<CarbonFavoriteFilled />} />
    <InfoBox info={(50).toString()} icon={<MdiBellOutline />} />
    <InfoBox
      info={QuestionsWithAnswers.length.toString()}
      icon={<MdiChatQuestionOutline className="text-orange-500" />}
    />
    <InfoBox
      info={(99).toString()}
      icon={<RiQuestionAnswerLine className="text-blueColor" />}
    />
    <InfoBox
      info={PendingQuestions.length.toString()}
      icon={<IcRoundPendingActions className="text-green-500" />}
    />
    <InfoBox
      info={RejectedQuestions.length.toString()}
      icon={<SimpleLineIconsClose className="text-destructive" />}
    />
  </div>
);
export default StatisticsBox;
