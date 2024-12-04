import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "./ui/button";

export const NotifyMsg: React.FC<{
  title: string;
  msg: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}> = ({ title, msg, open, onOpenChange }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogTitle>{title}</DialogTitle>
        <div className="text-center text-muted-foreground text-xl">{msg}</div>
      </DialogContent>
    </Dialog>
  );
};
