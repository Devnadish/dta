import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const ProfileAvatar = ({ src, name }: { src?: string; name?: string }) => (
  <Avatar className="w-24 h-24">
    <AvatarImage src={src} alt={name} />
    <AvatarFallback>{name?.[0]}</AvatarFallback>
  </Avatar>
);
export default ProfileAvatar;
