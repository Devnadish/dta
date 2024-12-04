"use server";
import db from "@/lib/prisma";
import { revalidatePath } from "next/cache";
export async function submitFreeGift(prevState: any, formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const mobile = formData.get("mobile") as string;

  const check = await db.freeOffer.findFirst({ where: { email: email } });
  if (check) {
    return { message: "Email already exists" };
  }

  const res = await db.freeOffer.create({
    data: {
      name: name,
      email: email,
      mobile: mobile,
    },
  });
  revalidatePath("/faq");
  return { message: "Your request has been sent successfully" };
}
