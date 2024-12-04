import { LogOut } from "lucide-react";
import { signOut, useSession } from "next-auth/react";

export default function Logout() {
  const { data: session } = useSession();
  if (!session) return null;
  return (
    <button onClick={() => signOut()} className="text-muted-foreground">
      <LogOut size={20} className="cursor-pointer hover:text-primary" />
    </button>
  );
}
