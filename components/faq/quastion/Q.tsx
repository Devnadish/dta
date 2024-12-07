import UserInformation from "@/components/UserInformaton";

const Q = ({ quastion, auther }: { quastion: string; auther: string }) => {
  return (
    <div className="flex flex-row items-center gap-2 w-full  ">
      <UserInformation email={auther ?? ""} showName={false} />
      <p className="text-sm font-semibold text-foreground ">{quastion}</p>
    </div>
  );
};
export default Q;
