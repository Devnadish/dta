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
  const questionCondition = {
    question: {
      contains: search,
      mode: Prisma.QueryMode.insensitive,
    },
  };
  const answerCondition = {
    answers: {
      some: {
        content: {
          contains: search,
          mode: Prisma.QueryMode.insensitive,
        },
      },
    },
  };
  switch (mode) {
    case "questions":
      return questionCondition;
    case "answers":
      return answerCondition;
    default:
      return questionCondition;
  }
};

export async function GetQuestions(
  tag: string,
  search: string,
  mode: string,
  sort: string,
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
  const sortCondition =
    sort === "newest" ? { updatedAt: "desc" } : { viewerCount: "desc" };

  const whereCondition = {
    ...baseCondition,
    ...tagCondition,
    ...searchCondition,
  };

  const { QuestionsWithAnswers, QueryCont, pagesCount } = await quastionMode(
    whereCondition,
    skip,
    limit,
    sortCondition
  );
  return { QuestionsWithAnswers, QueryCont, pagesCount };
}

const quastionMode = async (
  whereCondition: any,
  skip: number,
  limit: number,
  sortCondition: any
) => {
  try {
    const QueryCont = await db.faq.count({
      where: whereCondition,
    });

    const QuestionsWithAnswers = await db.faq.findMany({
      where: whereCondition,
      include: { answers: true, tagged: true },
      orderBy: sortCondition,
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
