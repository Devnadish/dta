"use server";
import db from "@/lib/prisma";
import { faker } from "@faker-js/faker";
import { Prisma } from "@prisma/client";

interface FaqItem {
  answers: string[]; // Adjust the type of answers as needed
}

export async function CollectAllFaq() {
  const faq = await db.faq.findMany();
  return faq;
}

export async function GetFaqById(id: string) {
  const faq = await db.faq.findUnique({
    where: { id },
    include: { answers: true, tagged: true },
  });
  return faq;
}

export async function GetRejectedFaq() {
  const rejectedQuestions = await db.faq.findMany({
    where: { rejected: true },
  });
  return { rejectedQuestions };
}

export async function GetAnsweredFaq() {
  const faq = await db.faq.findMany({ where: { answers: { some: {} } } });
  return faq;
}

export async function GetNotAnsweredFaq() {
  const faq = await db.faq.findMany({ where: { answers: { none: {} } } });
  return faq;
}

export async function createFakeFaq() {
  const fakeData = [];

  for (let i = 0; i < 30; i++) {
    const question = {
      slug: faker.lorem.slug(),
      question: faker.lorem.sentence(),
      userid: faker.string.uuid(),
      viewerCount: faker.number.int({ min: 0, max: 100 }),
      isShow: true,
    };

    const createdFAQ = await db.faq.create({
      data: question,
    });
  }
}

export const FaqCounter = async () => {
  const answeredQuestions = await db.faq.count({
    where: { gotAnswer: true, published: true },
  });
  const pendingQuestions = await db.faq.count({
    where: { gotAnswer: false, published: true },
  });
  const rejectedQuestions = await db.faq.count({
    where: { rejected: true },
  });

  return { answeredQuestions, pendingQuestions, rejectedQuestions };
};

export async function GetQuestions1(
  tag: string,
  search: string,
  querymode: string,
  mode: string,
  page: number = 1,
  limit: number = 10
) {
  const skip = (page - 1) * limit;

  let whereCondition;
  if (querymode === "questions") {
    whereCondition = {
      published: true,
      rejected: false,
      ...(tag !== "all" && {
        tagged: { some: { tag } },
        gotAnswer: true,
      }),
      ...(search && {
        question: {
          contains: search,
          mode: Prisma.QueryMode.insensitive,
        },
      }),
    };
  } else {
    whereCondition = {
      published: true,
      rejected: false,
      gotAnswer: true,
      ...(tag !== "all" && {
        tagged: { some: { tag: tag?.toLowerCase() } },
      }),
      ...(search && {
        answers: {
          some: {
            content: search,
          },
        },
      }),
    };
  }
  console.log(whereCondition);
  try {
    const QueryCont = await db.faq.count({
      where: whereCondition,
    });
    const pagesCount = Math.ceil(QueryCont / limit);

    const QuestionsWithAnswers = await db.faq.findMany({
      where: whereCondition,
      include: { answers: true, tagged: true },
      orderBy: { updatedAt: "desc" },
      skip,
      take: limit,
    });

    return { QuestionsWithAnswers, QueryCont, pagesCount };
  } catch (error) {
    console.error("Error fetching questions:", error);
    throw new Error("Failed to fetch questions.");
  }
}

export async function GetNotAnsweredQuations() {
  const notAnsweredQuestions = await db.faq.findMany({
    where: {
      published: true,
      rejected: false,
      gotAnswer: false,
    },
    include: { answers: true, tagged: true },
    orderBy: { updatedAt: "desc" },
  });

  return { notAnsweredQuestions };
}

// export async function GetQuestions(
//   tag: string,
//   search: string,
//   mode: string,
//   page: number = 1,
//   limit: number = 10
// ) {
//   const skip = (page - 1) * limit;

//   const whereCondition = {
//     published: true,
//     rejected: false,
//     ...(tag !== "all" && {
//       tagged: { some: { tag } },
//       gotAnswer: true,
//     }),
//     ...(search && {
//       question: {
//         contains: search,
//         mode: "insensitive",
//       },
//     }),
//   };

//   try {
//     const QuestionsWithAnswers = await db.faq.findMany({
//       where: whereCondition,
//       include: { answers: true, tagged: true },
//       orderBy: { updatedAt: "desc" },
//       skip,
//       take: limit,
//     });

//     return { QuestionsWithAnswers };
//   } catch (error) {
//     console.error("Error fetching questions:", error);
//     throw new Error("Failed to fetch questions.");
//   }
// }

// const whereCondition = {
//   published: true,
//   rejected: false,
//   ...(tag !== "all" && {
//     tagged: { some: { tag: tag?.toLowerCase() } },
//     gotAnswer: true,
//   }),
//   OR: [
//     {
//       question: {
//         contains: search,
//         mode: Prisma.QueryMode.insensitive,
//       },
//     },
//     {
//       answers: {
//         some: {
//           content: {
//             contains: search,
//             mode: Prisma.QueryMode.insensitive,
//           },
//         },
//       },
//     },
//   ],
// };

// export async function GetQuestions(
//   tag: string,
//   search: string,
//   mode: string,
//   page: number = 1,
//   limit: number = 10
// ) {
//   const skip = (page - 1) * limit;

//   const whereCondition = {
//     published: true,
//     rejected: false,
//     ...(tag !== "all" && {
//       tagged: { some: { tag: tag?.toLowerCase() } },
//       gotAnswer: true,
//     }),
//     ...(search && {
//       question: {
//         contains: search,
//         mode: Prisma.QueryMode.insensitive,
//       },
//     }),
//     ...(search && {
//       answers: { some: { content: search } },
//     }),
//   };

//   try {
//     const QuestionsWithAnswers = await db.faq.findMany({
//       where: whereCondition,
//       include: { answers: true, tagged: true },
//       orderBy: { updatedAt: "desc" },
//       skip,
//       take: limit,
//     });

//     return { QuestionsWithAnswers };
//   } catch (error) {
//     console.error("Error fetching questions:", error);
//     throw new Error("Failed to fetch questions.");
//   }
// }
