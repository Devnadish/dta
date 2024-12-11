import { dateToSting } from "@/lib/nadish";
import { Card } from "@/components/ui/card";
import { GetRejectedFaq } from "@/actions/faq/faq";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import FaqHeaderInformation from "@/components/faq/FaqHeaderInformation";
import { Smile } from "lucide-react";

export default async function NotAnswered({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = (await params).locale;
  const { rejectedQuestions } = await GetRejectedFaq();
  const t = await getTranslations("Faq");
  return (
    <div className="p-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2">
        {rejectedQuestions.length !== 0 && (
          <h1 className="text-sm md:text-2xl font-bold  font-tajawalLight">
            <span className="text-destructive font-bold font-tajawal">
              {t("rejected")}{" "}
            </span>
            {t("rejectedHint")}
          </h1>
        )}
        <Link
          href={`/${locale}/faq/privicy`}
          className="font-cairo underline text-blue-500"
        >
          {t("privicy")}
        </Link>
      </div>
      {rejectedQuestions.length === 0 ? (
        <NoRejected title={t("noRejectMsg")} />
      ) : (
        <NotAnsweredQuestions Questions={rejectedQuestions} />
      )}
    </div>
  );
}

const NotAnsweredQuestions = ({ Questions }: { Questions: any[] }) => (
  <div className="flex flex-col gap-4">
    {Questions.map((item) => (
      <Card key={item.id} className="border-destructive/50">
        <div className="mb-4  p-4 ">
          <FaqHeaderInformation item={item} />
          <h1 className="text-lg font-semibold">{item?.question}</h1>
          <h1 className="text-lg bg-destructive rounded-sm p-1  ">
            {item?.rejectedReason}
          </h1>
        </div>
      </Card>
    ))}
  </div>
);

const NoRejected = ({ title }: { title: string }) => (
  <div className="flex items-center justify-center  text-xl font-cairo font-bold w-full h-32 bg-destructive rounded-lg text-foreground flex-col gap-4">
    {title}
    <Smile className="text-4xl" size={50} />
  </div>
);




