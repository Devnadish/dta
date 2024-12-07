import React from "react";
import { GetDetailQuastion } from "@/actions/faq/detailQuastion";
import ShowDetailQuastion from "@/components/faq/detail/ShowDetailQuastion";
import { authOptions } from "@/lib/authConfig";
import { auth } from "@/auth";

async function page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const question = await GetDetailQuastion(slug);
  const session = await auth();
  const userEmail = session?.user?.email;

  if (!question) {
    // Handle the case when the question is not found
    return <div>Question not found</div>;
  }

  return (
    <ShowDetailQuastion
      item={question}
      key={question.id}
      userEmail={userEmail ?? ""}
    />
  );
}

export default page;
