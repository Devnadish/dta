"use server";
import db from "@/lib/prisma";
import { faq } from "@prisma/client";

export async function GetUserByEmail(email: string) {
  const user = await db.user.findUnique({ where: { email: email } });
  return user;
}

export async function GetUserById(id: string) {
  const user = await db.user.findUnique({ where: { id } });
  return user;
}

export async function getUserProfile(id: string) {
  const userHistory = await db.user.findUnique({ where: { id } });
  let quastion: faq[] = [];
  if (userHistory?.email) {
    quastion = await db.faq.findMany({
      where: { userEmail: userHistory.email },
    });
  }

  const QuestionsWithAnswers = quastion.filter(
    (Question) => Question.gotAnswer && Question.published && !Question.rejected
  );
  const PendingQuestions = quastion.filter(
    (Question) =>
      !Question.gotAnswer && Question.published && !Question.rejected
  );
  const RejectedQuestions = quastion.filter((Question) => Question.rejected);
  // remian Notifaction,Favorite,Like

  return {
    userHistory,
    quastion,
    QuestionsWithAnswers,
    PendingQuestions,
    RejectedQuestions,
  };
}
