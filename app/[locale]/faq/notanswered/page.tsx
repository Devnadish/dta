import { Card } from "@/components/ui/card";
import { GetNotAnsweredQuations } from "@/actions/faq/faq";
import { getTranslations } from "next-intl/server";
import FaqHeaderInformation from "@/components/faq/FaqHeaderInformation";
import { Loader } from "lucide-react";

export default async function NotAnswered({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { notAnsweredQuestions } = await GetNotAnsweredQuations();
  const t = await getTranslations("Faq");
  return (
    <div className="p-4">
      <h1 className="text-sm md:text-2xl font-bold mb-4 font-tajawalLight">
        <span className="text-yellowColor font-bold font-tajawal">
          {t("pending")}{" "}
        </span>
        {t("notAnsweredHint")}
      </h1>
      {notAnsweredQuestions.length === 0 ? (
        <NoMoreQuestions title={t("noAnsweredMsg")} />
      ) : (
        <NotAnsweredQuestions Questions={notAnsweredQuestions} />
      )}
    </div>
  );
}

const NoMoreQuestions = ({ title }: { title: string }) => (
  <div className="flex items-center justify-center  text-xl font-cairo font-bold w-full h-32 bg-yellowColor rounded-lg text-blueColor  flex-col gap-4">
    {title}
    <Loader className="text-4xl animate-spin" size={50} />
  </div>
);

const NotAnsweredQuestions = ({ Questions }: { Questions: any[] }) => {
  return (
    <div className="flex flex-col gap-4">
      {Questions.map((item) => (
        <Card key={item.id}>
          <div className="mb-4  p-4 ">
            <FaqHeaderInformation item={item} />
            {item.question}
          </div>
        </Card>
      ))}
    </div>
  );
};
