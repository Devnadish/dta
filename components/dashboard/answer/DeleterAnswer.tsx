"use client";
import { Trash } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";
import { deleteAnswer } from "@/actions/faq/dashboard";

function DeleterAnswer({ AID, QID }: { AID: string; QID: string }) {
  const RemoveAnswer = async (AID: string, QID: string) => {
    await deleteAnswer(AID, QID);
  };
  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => RemoveAnswer(AID, QID)}
    >
      <Trash />
    </Button>
  );
}

export default DeleterAnswer;
