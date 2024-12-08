"use server";
import db from "@/lib/prisma";
import { faker } from "@faker-js/faker";
import { Prisma } from "@prisma/client";

const getSearchCondition = (search: string, mode: string) => {
  if (!mode) {
    mode = "questions";
  }
  if (!search) {
    console.debug("No search term provided");
    return {};
  }

  console.debug(`Searching for "${search}" in ${mode}`);

  switch (mode) {
    case "questions":
      return {
        question: {
          contains: search,
          mode: Prisma.QueryMode.insensitive,
        },
      };
    case "answers":
      return {
        answers: {
          some: {
            OR: search.split(" ").map((word) => ({
              content: {
                contains: word,
                mode: Prisma.QueryMode.insensitive,
              },
            })),
          },
        },
      };
    default:
      console.warn(`Invalid search mode: ${mode}`);
      return {};
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

  const test = await db.answer.findMany({
    where: {
      content: {
        contains: "khlood demum",
        mode: Prisma.QueryMode.insensitive,
      },
    },
  });

  try {
    const [QueryCont, QuestionsWithAnswers] = await Promise.all([
      db.faq.count({
        where: whereCondition,
      }),
      db.faq.findMany({
        where: whereCondition,
        include: { answers: true, tagged: true },
        orderBy: { updatedAt: "desc" },
        skip,
        take: limit,
      }),
    ]);

    const pagesCount = Math.ceil(QueryCont / limit);

    return { QuestionsWithAnswers, QueryCont, pagesCount };
  } catch (error) {
    console.error("Error fetching questions:", error);
    throw new Error("Failed to fetch questions.");
  }
}
