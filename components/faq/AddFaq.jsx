"use client";

import { useState, useCallback, memo, useEffect } from "react";
import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Textarea } from "../ui/textarea";
import { submitFaq } from "@/actions/faq/submitFaq";
import { useToast } from "@/hooks/use-toast";
import { useTranslations } from "next-intl";
import LoaderComponent from "../Loader";
import { RecordQuestion } from "./quastion/RecordQuestion";
import ImageQuestion from "./quastion/ImageQuestion";

const FaqForm = memo(({ onClose, user }) => {
  const [question, setQuestion] = useState("");
  const { toast } = useToast();

  const userEmail = user.user.email;
 

  const handleSubmit = async (formData) => {
    const question = formData.get("question");


    if (!question.trim()) {
      toast({
        title: "Error",
        description: "Question is required",
      });
      return;
    }

    const result = await submitFaq(question, userEmail);

    if (result.error) {
      toast({
        title: "Error",
        description: "Question already exists",
      });
    } else {
      toast({
        title: "Success",
        description: "Question added successfully. Will respond soon.",
      });
      setQuestion("");
      onClose();
    }
  };

  return (
    <form action={handleSubmit} className="flex flex-col gap-4">
      <Textarea
        placeholder="Question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        className="min-h-[100px]"
        name="question"
        required
      />
      {/* <MicrophonePermission /> */}
       <div className="flex flex-row items-center justify-center gap-4 w-full h-11">
       <RecordQuestion />
       <ImageQuestion   />
       <Button
        type="submit"
        className="bg-green-500 hover:bg-green-600 text-white w-full"
      >
        Save
      </Button>

       </div>
       
      
    </form>
  );
});

FaqForm.displayName = "FaqForm";

// Main component
const AddFaq = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleOpen = useCallback(() => setIsOpen(true), []);
  const handleClose = useCallback(() => setIsOpen(false), []);
  const t = useTranslations("Faq");
  if (!isMounted) return <LoaderComponent />;
  return (
    <div>
      {user ? (
        <Button
          onClick={handleOpen}
          className="bg-yellowColor text-black hover:bg-green-600 hover:text-white"
        >
          <Plus className="  h-4 w-4" />
          <p className="text-sm font-cairo font-bold text-black hover:text-white">
            {t("addFaq")}
          </p>
        </Button>
      ) : (
        <p className="text-sm  font-cairo font-bold text-primary">
          {t("addQuestion")}
        </p>
      )}

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Question</DialogTitle>
          </DialogHeader>
          {isOpen && <FaqForm onClose={handleClose} user={user} />}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default memo(AddFaq);
