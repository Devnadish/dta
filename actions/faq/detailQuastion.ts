"use server";
import db from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function GetDetailQuastion(slug: string) {
  const question = await db.faq.findUnique({
    where: { slug },
    include: {
      answers: true,
      tagged: true,
    },
  });
  return question;
}

export const incrementViewerCount = async (slug: string) => {
  await db.faq.update({
    where: { slug },
    data: { viewerCount: { increment: 1 } },
  });
  revalidatePath(`/faq/ansewrd`);
};

export async function interactionAction(
  slug: string,
  userEmail: string,
  action: string
) {
  const faq = await db.faq.findUnique({
    where: { slug },
    select: {
      id: true,
      loveCount: true,
      dislovCount: true,
    },
  });

  if (!faq) {
    throw new Error("FAQ not found");
  }

  let interaction = await db.faqInteraction.findFirst({
    where: { faqId: faq.id, userEmail },
  });

  if (!interaction) {
    // Create new interaction
    interaction = await db.faqInteraction.create({
      data: {
        faqId: faq.id,
        userEmail,
        isLoved: action === "love",
        isDisliked: action === "dislike",
      },
    });

    // Update counts based on the action
    if (action === "love") {
      await db.faq.update({
        where: { id: faq.id },
        data: { loveCount: { increment: 1 } },
      });
    } else if (action === "dislike") {
      await db.faq.update({
        where: { id: faq.id },
        data: { dislovCount: { increment: 1 } },
      });
    }
  } else {
    // User has already interacted
    if (action === "love") {
      if (!interaction.isLoved) {
        // If previously disliked, decrement dislovCount
        if (interaction.isDisliked) {
          await db.faq.update({
            where: { id: faq.id },
            data: {
              dislovCount: { decrement: 1 },
              loveCount: { increment: 1 },
            },
          });
        } else {
          // Just increment loveCount
          await db.faq.update({
            where: { id: faq.id },
            data: { loveCount: { increment: 1 } },
          });
        }
        // Update interaction
        await db.faqInteraction.update({
          where: { faqId_userEmail: { faqId: faq.id, userEmail } },
          data: { isLoved: true, isDisliked: false },
        });
      }
    } else if (action === "dislike") {
      if (!interaction.isDisliked) {
        // If previously loved, decrement loveCount
        if (interaction.isLoved) {
          await db.faq.update({
            where: { id: faq.id },
            data: {
              loveCount: { decrement: 1 },
              dislovCount: { increment: 1 },
            },
          });
        } else {
          // Just increment dislovCount
          await db.faq.update({
            where: { id: faq.id },
            data: { dislovCount: { increment: 1 } },
          });
        }
        // Update interaction
        await db.faqInteraction.update({
          where: { faqId_userEmail: { faqId: faq.id, userEmail } },
          data: { isLoved: false, isDisliked: true },
        });
      }
    }
  }

  revalidatePath(`/detailquastion/${slug}`);
}

// export async function interactionAction(
//   slug: string,
//   userEmail: string,
//   action: string
// ) {
//   // faq info
//   const faq = await db.faq.findUnique({
//     where: { slug },
//     select: {
//       id: true,
//       loveCount: true,
//     },
//   });

//   if (!faq) {
//     throw new Error("FAQ not found");
//   }

//   // interaction info
//   let interaction;
//   interaction = await db.faqInteraction.findFirst({
//     where: { faqId: faq.id, userEmail },
//   });

//   //check if exist or create
//   if (!interaction) {
//     interaction = await db.faqInteraction.create({
//       data: { faqId: faq.id, userEmail, isLoved: true, isDisliked: false },
//     });
//   }

//   if (action === "love") {
//     await loveAction(faq.id, userEmail);
//   }

//   if (action === "dislike") {
//     await dislikeAction(faq.id, userEmail);
//   }

//   revalidatePath(`/detailquastion/${slug}`);
// }

// const loveAction = async (faqId: string, userEmail: string) => {
//   await db.faqInteraction.update({
//     where: {
//       faqId_userEmail: {
//         faqId: faqId,
//         userEmail: userEmail,
//       },
//     },
//     data: { isLoved: true, isDisliked: false },
//   });

//   await db.faq.update({
//     where: { id: faqId },
//     data: { loveCount: { increment: 1 } },
//   });
// };

// const dislikeAction = async (faqId: string, userEmail: string) => {
//   await db.faqInteraction.update({
//     where: {
//       faqId_userEmail: {
//         faqId: faqId,
//         userEmail: userEmail,
//       },
//     },
//     data: { isLoved: false, isDisliked: true },
//   });

//   await db.faq.update({
//     where: { id: faqId },
//     data: { dislovCount: { increment: 1 } },
//   });
// };
