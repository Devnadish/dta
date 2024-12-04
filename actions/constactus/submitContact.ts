"use server";
import db from "@/lib/prisma";
import { revalidatePath } from "next/cache";
export async function submitContact(prevState: any, formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;
  const mobile = formData.get("mobile") as string;

  const res = await db.contactus.create({
    data: {
      name: name,
      email: email,
      message: message,
      mobile: mobile,
    },
  });
  revalidatePath("/contact");
  return res;
}
