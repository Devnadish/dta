"use server";
import db from "@/lib/prisma";
import { Prisma } from "@prisma/client";

const getSearchCondition = (search: string, mode: string) => {
  if (!mode) {
    mode = "questions";
  }
  if (!search) {
    console.debug("No search term provided");
    return {};
  }

  switch (mode) {
    case "questions":
      const questionCondition = {
        question: {
          contains: search,
          mode: Prisma.QueryMode.insensitive,
        },
      };
      return { questionCondition, mode };

    case "answers":
      const answerCondition = {
        content: {
          contains: search,
          mode: Prisma.QueryMode.insensitive,
        },
      };

      return { answerCondition, mode };

    default:
      const defaultCondition = {
        question: {
          contains: search,
          mode: Prisma.QueryMode.insensitive,
        },
      };
      return { defaultCondition, mode };
  }
};

export async function GetQuestions(
  tag: string,
  search: string,
  mode: string,
  page: number = 1,
  limit: number = 10
) {
  const skip = (page - 1) * limit;

  const baseCondition = {
    published: true,
    rejected: false,
    gotAnswer: true,
  };

  const tagCondition =
    tag === undefined ? {} : { tagged: { some: { tag: tag.toLowerCase() } } };

  const searchCondition = getSearchCondition(search, mode);

  const whereCondition = {
    ...baseCondition,
    ...tagCondition,
    ...searchCondition,
  };

  const test = await db.faq.findMany({
    where: {
      answers: {
        some: {
          content: {
            contains: search,
            mode: Prisma.QueryMode.insensitive,
          },
        },
      },
    },
    include: {
      answers: true,
      tagged: true,
    },
    orderBy: { updatedAt: "desc" },
    skip,
    take: limit,
  });

  if (mode === undefined) {
    const { QuestionsWithAnswers, QueryCont, pagesCount } = await quastionMode(
      whereCondition,
      skip,
      limit
    );
    return { QuestionsWithAnswers, QueryCont, pagesCount };
  } else {
    const { QuestionsWithAnswers } = await answerMode(search, skip, limit);
    return { QuestionsWithAnswers };
  }
}

const quastionMode = async (
  whereCondition: any,
  skip: number,
  limit: number
) => {
  try {
    const QueryCont = await db.faq.count({
      where: whereCondition,
    });

    const QuestionsWithAnswers = await db.faq.findMany({
      where: whereCondition,
      include: { answers: true, tagged: true },
      orderBy: { updatedAt: "desc" },
      skip,
      take: limit,
    });

    const pagesCount = Math.ceil(QueryCont / limit);

    return { QuestionsWithAnswers, QueryCont, pagesCount };
  } catch (error) {
    console.error("Error fetching questions:", error);
    throw new Error("Failed to fetch questions.");
  }
};

const answerMode = async (search: any, skip: number, limit: number) => {
  try {
    const answers = await db.answer.findMany({
      where: {
        content: {
          contains: search,
          mode: Prisma.QueryMode.insensitive,
        },
      },
      select: {
        id: true,
        faqId: true,
      },
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
    });

    const faqIds = answers.map((answer) => answer.faqId);

    const QuestionsWithAnswers = await db.faq.findMany({
      where: {
        id: {
          in: faqIds,
        },
      },
      include: {
        answers: true,
        tagged: true,
      },
    });

    return { QuestionsWithAnswers };
  } catch (error) {
    console.error("Error fetching questions:", error);
    throw new Error("Failed to fetch questions.");
  }
};
