
import { Check, Loader, X } from "lucide-react";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MageFilter } from "@/components/icons/FilterIcons";
import { getTranslations } from "next-intl/server";
import { CircumFilter } from "@/components/icons/QIcon";

interface FAQProps {
  answeredQuestions: number;
  pendingQuestions: number;
  rejectedQuestions: number;
  msgHint?: string;
  linkTitle: {
    pending: string;
    answered: string;
    rejected: string;
  };
}

const ShowQuastionType = ({
  answeredQuestions = 0,
  pendingQuestions = 0,
  rejectedQuestions = 0,
  msgHint,
  linkTitle

}: FAQProps
) => {
  return (
    <div className="md:hidden">
      <Sheet >
        <SheetTrigger className=" p-2 flex items-center justify-center text-muted-foreground bg-secondary  rounded-md ">
          <CircumFilter />
        </SheetTrigger>
        <SheetContent
          className="w-72 flex flex-col items-center gap-4 p-4"
          side={"left"}
        >
          <SheetHeader className="w-full justify-center items-center font-cairo">
            <SheetTitle className="font-amiri text-xl">Question Type</SheetTitle>
            <SheetDescription
              className={`w-full ${msgHint === "ar" ? "text-right" : "text-left"} items-center text-pretty font-amiri`}
            >
              {msgHint}
            </SheetDescription>
          </SheetHeader>
          <NavLinks answeredQuestions={answeredQuestions} pendingQuestions={pendingQuestions} rejectedQuestions={rejectedQuestions} linkTitle={linkTitle} />
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default ShowQuastionType;
export const NavLinks = ({
  answeredQuestions = 0,
  pendingQuestions = 0,
  rejectedQuestions = 0,
  linkTitle
}: FAQProps) => {



  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-3 w-full">
      <Link href={"/faq/ansewrd"} className="w-full border flex flex-row items-center md:justify-center gap-3 text-sm border-greenColor/50 rounded-md p-1 ">
        <Check size={20} className="text-greenColor" />
        <p className="text-xs text-muted-foreground font-cairo">{answeredQuestions}{"  "}<span className="font-bold">{linkTitle.answered}</span></p>

      </Link>
      <Link href={"/faq/notanswered"} className="w-full border flex flex-row items-center md:justify-center gap-3 text-sm border-yellowColor/50 rounded-md p-1 " >
        <Loader size={20} className="text-yellowColor" />
        <p className="text-xs text-muted-foreground  font-cairo">{pendingQuestions}{"  "}<span className="font-bold">{linkTitle.pending}</span></p>




      </Link>
      <Link href={`/faq/rejected`} className="w-full border flex flex-row items-center md:justify-center gap-3 text-sm border-destructive rounded-md p-1 ">
        <X size={20} className="text-destructive" />
        <p className="text-xs text-muted-foreground  font-cairo">{rejectedQuestions}{"  "}<span className="font-bold">{linkTitle.rejected}</span></p>

      </Link>

    </div>
  );
};


