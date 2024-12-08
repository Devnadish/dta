"use client";
import { addCommentToAnswer } from "@/actions/faq/addComment";
import { CommentsIcon } from "@/components/icons/QIcon";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import UserInformation from "@/components/UserInformaton";
import { answer, comment } from "@prisma/client";
import { CommitIcon } from "@radix-ui/react-icons";
import { ChevronDownIcon, ChevronUpIcon, SendIcon } from "lucide-react";
import React, { useState } from "react";

function CommentForm({
  answerId,
  userEmail,
  slug,
}: {
  answerId: string;
  userEmail: string;
  slug: string;
}) {
  const [newComment, setNewComment] = useState("");

  async function CreateComment(formData: FormData) {
    const comment = formData.get("comment");
    const saveComment = await addCommentToAnswer(
      answerId,
      userEmail,
      comment as string,
      slug
    );
    setNewComment("");
  }

  return (
    <form action={CreateComment} className="flex flex-row gap-2">
      <Input
        type="text"
        value={newComment}
        name="comment"
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Add a comment"
      />
      <Button type="submit" variant="outline">
        <SendIcon className="w-4 h-4" />
      </Button>
    </form>
  );
}

function Comments({
  answerId,
  userEmail,
  item,
  slug,
}: {
  //   comments: comment[];
  answerId: string;
  userEmail: string;
  item: answer;
  slug: string;
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row items-center gap-2 w-full justify-between">
        <Button
          className="text-blue-500 hover:text-blue-700 focus:outline-none"
          onClick={toggleExpanded}
        >
          {isExpanded ? (
            <>
              <p>Hide Comments</p>
              <ChevronUpIcon className="w-4 h-4" />
            </>
          ) : (
            <>
              <p>Add And Show Comments</p>
              <ChevronDownIcon className="w-4 h-4" />
            </>
          )}
        </Button>
        <div className="flex flex-row items-center gap-2">
          <CommentsIcon className="w-4 h-4" />
          <p className="text-xs text-muted-foreground">
            {item.comments.length}
          </p>
        </div>
      </div>

      {isExpanded && (
        <div className="mt-4 w-full bg-background/30 p-4 rounded-md flex flex-col gap-2">
          <CommentForm answerId={answerId} userEmail={userEmail} slug={slug} />

          <ul className="flex flex-col gap-2">
            {item.comments.map((comment) => (
              <li
                key={comment.id}
                className="text-xs text-muted-foreground flex items-center gap-2"
              >
                <ImageAvatar
                  userImage={comment.userImage}
                  email={comment.userEmail}
                />
                {comment.content}
                {/* <UserInformation email={comment.userEmail} showName={false} /> */}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Comments;

const ImageAvatar = ({
  userImage,
  email,
}: {
  userImage: string;
  email: string;
}) => {
  return (
    <Avatar className="w-6 h-6">
      <AvatarImage src={userImage} />
      <AvatarFallback className="capitalize">{email?.[0]}</AvatarFallback>
    </Avatar>
  );
};
