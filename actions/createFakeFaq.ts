// app/page.tsx (or any other component file)
"use server";
import db from "../lib/prisma";
import { faker } from "@faker-js/faker";

// Server action to create fake data
export async function CreateFakeData() {
  await db.answer.deleteMany();
  await db.tagged.deleteMany();
  await db.faq.deleteMany();
  await db.faqInteraction.deleteMany();
  const fakeData = [];

  console.log("START questionData");
  for (let i = 0; i < 30; i++) {
    const question = faker.lorem.sentence({ min: 3, max: 15 });
    const questionData = {
      slug: faker.helpers.slugify(question),
      question,
      userEmail: faker.internet.email(),
      viewerCount: faker.number.int({ min: 0, max: 100 }),
      published: true,
      rejected: false,
      gotAnswer: true,
    };
    console.log(questionData);
    const createdFAQ = await db.faq.create({
      data: questionData,
    });
    const numAnswers = faker.number.int({ min: 1, max: 30 });

    for (let j = 0; j < numAnswers; j++) {
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
  console.log("DONE questionData");

  return fakeData;
}
