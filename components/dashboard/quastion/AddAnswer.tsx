"use client";
import { AddFaqAnswere } from "@/actions/faq/dashboard";
import LoaderComponent from "@/components/Loader";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export default function AddAnswere({
  QID,
  Question,
}: {
  QID: string;
  Question: string;
}) {
  const [loading, setLoading] = useState(false);
  const handleAddAnswere = async (formData: FormData) => {
    setLoading(true);
    await AddFaqAnswere(QID, formData.get("answere") as string);
    setLoading(false);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          {loading ? <LoaderComponent /> : "Add Answere"}
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle> Add Answere To Question</DialogTitle>
          <DialogDescription>{Question}</DialogDescription>
        </DialogHeader>
        <form action={handleAddAnswere} className="w-full gap-4 flex flex-col ">
          <Textarea id="answere" className="w-full" name="answere" />
          <DialogClose
            type="submit"
            className="w-full bg-greenColor rounded-md text-black font-semibold"
          >
            Save Answere
          </DialogClose>
        </form>
      </DialogContent>
    </Dialog>
  );
}
