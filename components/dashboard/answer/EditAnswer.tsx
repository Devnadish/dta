"use client";
import { Edit, Loader, Trash } from "lucide-react";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { deleteAnswer, updateAnswer } from "@/actions/faq/dashboard";
import { Textarea } from "../../ui/textarea";
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
import LoaderComponent from "@/components/Loader";

function EditAnswer({
  AID,
  QID,
  content,
}: {
  AID: string;
  QID: string;
  content: string;
}) {
  const [loading, setLoading] = useState(false);

  const saveAnswer = async (formData: FormData) => {
    setLoading(true);
    await updateAnswer(AID, QID, formData.get("answere") as string);
    // await AddFaqAnswere(QID, formData.get("answere") as string);
    setLoading(false);
  };

  // const saveAnswer = async (AID: string, QID: string, content: string) => {

  // };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Edit />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Answer</DialogTitle>
          <DialogDescription>Edit the answer to the question</DialogDescription>
        </DialogHeader>
        <form action={saveAnswer} className="w-full gap-4 flex flex-col ">
          <Textarea
            id="answere"
            className="w-full"
            name="answere"
            defaultValue={content}
          />
          <DialogClose
            type="submit"
            className="w-full bg-greenColor rounded-md text-black font-semibold"
          >
            {loading ? <LoaderComponent /> : "Save Update"}
          </DialogClose>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default EditAnswer;
