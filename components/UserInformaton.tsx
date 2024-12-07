import { GetUserByEmail } from "@/actions/user/user";
import { User } from "@prisma/client";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import logo from "@/public/logo.webp";
import Image from "next/image";

const UserInformation = async ({
  email,
  extraInfo,
  showName = false,
}: {
  email?: string;
  extraInfo?: React.ReactNode;
  showName?: boolean;
}) => {
  if (!email) return <Admin />;
  const user = await GetUserByEmail(email);
  const fallback = user?.name?.[0] || email?.[0] || "D";

  return (
    <div className="flex items-center  flex-col md:flex-row md:gap-2 justify-center w-fit ">
      <Avatar className="w-6 h-6">
        <AvatarImage src={user?.image ?? ""} />
        <AvatarFallback className="bg-greenColor text-foreground font-bold">
          {fallback}
        </AvatarFallback>
      </Avatar>
      {showName && (
        <div className="hidden md:flex flex-col w-full ">
          <p className="text-[10px]  text-muted-foreground">{user?.name}</p>
          {extraInfo && extraInfo}
        </div>
      )}
    </div>
  );
};

export default UserInformation;

const Admin = ({ email }: { email?: string }) => {
  return <Image src={logo.src} width={12} height={12} alt="dreamToApp" />;
};
