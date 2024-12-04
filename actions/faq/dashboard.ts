"use server";
import db from "@/lib/prisma";
import { revalidatePath } from "next/cache";
export type FaqType =
  | "all"
  | "needAnswer"
  | "answered"
  | "rejected"
  | "notPublished";
export const GetFaq = async (type: FaqType) => {
  if (type === "all") {
    return await CollectAllFaq();
  }
  if (type === "needAnswer") {
    return await GetNotAnsweredFaq();
  }
  if (type === "answered") {
    return await GetAnsweredFaq();
  }
  if (type === "rejected") {
    return await GetRejectedFaq();
  }
  if (type === "notPublished") {
    return await GetNotPublishedFaq();
  }
};

async function CollectAllFaq() {
  try {
    const fagData = await db.faq.findMany({
      where: { published: true, rejected: false },
      include: {
        answers: true,
        tagged: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return fagData;
  } catch (error) {
    console.error("Error fetching FAQs:", error);
    throw new Error("Failed to fetch FAQs");
  }
}

async function GetNotAnsweredFaq() {
  return await db.faq.findMany({
    where: { gotAnswer: false },
    include: {
      answers: true,
      tagged: true,
    },
  });
}

async function GetAnsweredFaq() {
  return await db.faq.findMany({
    where: { gotAnswer: true },
    include: {
      answers: true,
      tagged: true,
    },
  });
}

async function GetRejectedFaq() {
  return await db.faq.findMany({
    where: { rejected: true },
    include: {
      answers: true,
      tagged: true,
    },
  });
}

async function GetNotPublishedFaq() {
  return await db.faq.findMany({
    where: { published: false },
  });
}

export async function UpdateFaqPublished(QID: string, published: boolean) {
  try {
    const updatedFaq = await db.faq.update({
      where: { id: QID },
      data: { published },
    });
    revalidatePath("/dashboard/quastion");
    return updatedFaq;
  } catch (error) {
    console.error("Error updating FAQ published status:", error);
    throw new Error("Failed to update FAQ published status");
  }
}

export async function UpdateFaqRejected(
  QID: string,
  rejected: boolean,
  whyRejected: string
) {
  try {
    const updatedFaq = await db.faq.update({
      where: { id: QID },
      data: { rejected, rejectedReason: whyRejected },
    });
    revalidatePath("/dashboard/quastion");
    return updatedFaq;
  } catch (error) {
    console.error("Error updating FAQ rejected status:", error);
    throw new Error("Failed to update FAQ rejected status");
  }
}

export async function UpdateFaqUnRejected(QID: string) {
  // Fixed the closing parenthesis
  try {
    const updatedFaq = await db.faq.update({
      where: { id: QID },
      data: { rejected: false },
    });
    revalidatePath("/dashboard/quastion");
    return updatedFaq;
  } catch (error) {
    console.error("Error updating FAQ rejected status:", error);
    throw new Error("Failed to update FAQ rejected status");
  }
}

export const DashboardFaqCounter = async () => {
  const allQuestions = await db.faq.count({
    where: { published: true },
  });

  const answeredQuestions = await db.faq.count({
    where: { gotAnswer: true, published: true },
  });

  const unPublishedQuestions = await db.faq.count({
    where: { published: false },
  });

  const rejectedQuestions = await db.faq.count({
    where: { rejected: true },
  });

  const needAnswerQuestions = await db.faq.count({
    where: { gotAnswer: false },
  });

  return {
    allQuestions,
    answeredQuestions,
    unPublishedQuestions,
    rejectedQuestions,
    needAnswerQuestions,
  };
};

export async function AddFaqAnswere(QID: string, answere: string) {
  try {
    const newAnswere = await db.answer.create({
      data: {
        content: answere,
        faqId: QID,
      },
    });

    await db.faq.update({
      where: { id: QID },
      data: {
        gotAnswer: true,
        viewerCount: { increment: 1 },
      },
    });

    revalidatePath("/dashboard/quastion");
    revalidatePath("/faq");

    return newAnswere;
  } catch (error) {
    console.error("Error adding FAQ answer:", error);
    throw new Error("Failed to add FAQ answer");
  }
}

export async function deleteAnswer(AID: string, QID: string) {
  await db.answer.delete({ where: { id: AID } });
  revalidatePath("/dashboard/quastion/[QID]");
}

export async function updateAnswer(AID: string, QID: string, content: string) {
  await db.answer.update({ where: { id: AID }, data: { content } });
  revalidatePath("/dashboard/quastion/[QID]");
}
