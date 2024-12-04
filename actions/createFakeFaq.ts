// app/page.tsx (or any other component file)
"use server";
import db from "../lib/prisma";
import { faker } from "@faker-js/faker";

// Server action to create fake data
export async function CreateFakeData() {
  const fakeData = [];

  for (let i = 0; i < 100; i++) {
    const question = {
      slug: faker.lorem.slug(),
      question: faker.lorem.sentence({ min: 3, max: 15 }),
      userEmail: faker.internet.email(),
      viewerCount: faker.number.int({ min: 0, max: 100 }),
      published: true,
      rejected: false,
      gotAnswer: true,
    };

    const createdFAQ = await db.faq.create({
      data: question,
    });

    for (let j = 0; j < 13; j++) {
      const answer = {
        faqId: createdFAQ.id,
        content: faker.lorem.paragraph(),
      };

      await db.answer.create({
        data: answer,
      });
    }

    for (let j = 0; j < 3; j++) {
      const tag = {
        faqId: createdFAQ.id,
        tag: faker.helpers.arrayElement(["cat", "dog", "mouse"]), // 'dog'
      };

      await db.tagged.create({
        data: tag,
      });
    }

    fakeData.push(createdFAQ);
  }

  return fakeData;
}
