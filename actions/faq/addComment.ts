"use server";
import db from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";

export const addCommentToAnswer = async (
  answerId: string,
  userEmail: string,
  content: string,
  slug: string
) => {
  const session = await auth();

  const newComment = await db.comment.create({
    data: {
      answer: {
        connect: { id: answerId }, // Link the comment to the answer
      },
      userEmail,
      content,
      userImage: session?.user?.image ?? "",
    },
  });
  revalidatePath(`/detailquastion/${slug}`);
  return newComment;
};
