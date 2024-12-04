import InfoBox from "@/components/InfoBox";

import {
  CircumMobile1,
  ClarityEmailLine,
  FaBalanceScale,
  IcOutlineAccountBalanceWallet,
  IxJoin,
  PhBasketLight,
} from "@/components/icons/EmailIcon";
import { dateToSting } from "@/lib/nadish";
import { PersonStanding } from "lucide-react";

const UserInfoBox = ({
  userHistory,
  currentBalance,
}: {
  userHistory: any;
  currentBalance: number;
}) => (
  <div className="flex flex-row flex-wrap border p-2 rounded-md gap-2 w-full">
    <InfoBox info={userHistory.name} icon={<PersonStanding />} />
    <InfoBox info={userHistory.email} icon={<ClarityEmailLine />} />
    <InfoBox info={"1234567890"} icon={<CircumMobile1 />} />
    <InfoBox
      info={dateToSting(userHistory?.createdAt.toString())}
      icon={<IxJoin />}
    />
    <InfoBox info={userHistory?.subscriptionType} icon={<PhBasketLight />} />
    <InfoBox
      info={currentBalance.toString()}
      icon={<IcOutlineAccountBalanceWallet />}
    />
    <InfoBox
      info={(userHistory?.initailBalance ?? 0).toString()}
      icon={<FaBalanceScale />}
    />
  </div>
);
export default UserInfoBox;
