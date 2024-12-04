"use client";

import { Check, Loader, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const NavLinks = ({
  answered,
  pending,
  rejected,
}: {
  answered: any;
  pending: any;
  rejected: any;
}) => {
  const router = useRouter();
  useEffect(() => {
    router.push("/faq/ansewrd");
  }, []);

  const handleSelectChange = (value: string) => {
    router.push(value);
  };

  return (
    <div className="max-w-[150px] w-full">
      <Select onValueChange={handleSelectChange} defaultValue="/faq/ansewrd">
        <SelectTrigger className="text-foreground/80 font-cairo flex items-center justify-between gap-2 rounded-md   text-xs w-full bg-secondary ">
          <SelectValue placeholder="Select FAQ" />
        </SelectTrigger>
        <SelectContent className="w-full ">
          <SelectItem value="/faq/ansewrd">
            <div className="flex flex-row items-center gap-2 h-9">
              <Check size={20} />{" "}
              <p className="text-sm font-cairo"> {answered.name} </p>(
              {answered.count})
            </div>
          </SelectItem>
          <SelectItem value="/faq/notanswered">
            <div className="flex flex-row items-center gap-2 h-9">
              <Loader size={20} />{" "}
              <p className="text-sm font-cairo"> {pending.name} </p>(
              {pending.count})
            </div>
          </SelectItem>
          <SelectItem value="/faq/rejected">
            <div className="flex flex-row items-center gap-2 h-9">
              <X size={20} />{" "}
              <p className="text-sm font-cairo"> {rejected.name} </p>(
              {rejected.count})
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default NavLinks;
