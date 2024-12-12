import AnsweredQuestions from "@/components/faq/AnsweredQuestions";
import ShowQuastion from "@/components/faq/quastion/ShowQuastion";
import FilterResult from "../_component/FilterResult";
import { GetQuestions } from "@/actions/faq/answerFilter";
import NoQuestion from "@/components/icons/FilterIcons";
import { getTranslations } from "next-intl/server";
import { auth } from "@/auth";
import { FaqCounter } from "@/actions/faq/faq";
import MustLogin from "@/components/MustLogin";
import NavLinks from "../_component/NavLinks";
import { Loader } from "lucide-react";
import Link from "next/link";
import { FluentChatAdd16Regular } from "@/components/icons/QIcon";
import FaqSkelton from "@/components/skelton/FaqSkelton";

export default async function FAQ({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{
    tag: string;
    search: string;
    mode: string;
    sort: string;
  }>;
}) {
  const { tag, search, mode, sort } = await searchParams;
  const t = await getTranslations()
  const { QuestionsWithAnswers, QueryCont, pagesCount } = await GetQuestions(
    tag,
    search,
    mode,
    sort,
    1,
    10
  );

  return (
    <div className="flex flex-col gap-2 w-full  ">
      {/* <FaqSkelton /> */}
      {/* <FakFaq /> */}
      {/* <Link href="/faq/addquastion" className="fixed bottom-16 left-5 size-12 rounded-full flex items-center justify-center bg-blueColor text-foreground hover:bg-orangeColor hover:text-white animate-pulse">  <FluentChatAdd16Regular />
      </Link>
      <div className="flex flex-col  md:flex-row items-center justify-between w-full gap-4" >
        <WelcomeMessage />
        <NavLinks msgHint={t("Faq.notPerfect")} />
      </div> */}
      <FilterResult
        tag={tag}
        search={search}
        mode={mode}
        sort={sort}
        queryCount={QueryCont || 0}
        pagesCount={pagesCount || 0}
      />


      {QueryCont === 0 ? (
        <NoQuestions />
      ) : (
        <ShowQuestions QuestionsWithAnswers={QuestionsWithAnswers} />
      )}
    </div>
  );
}

const NoQuestions = () => {
  return (
    <div className="flex items-center justify-center w-full h-[50vh] flex-col gap-4">
      <NoQuestion width={100} height={100} />
      <p className="text-xl font-bold">No Quastion With Same Filter</p>
    </div>
  );
};

const ShowQuestions = ({
  QuestionsWithAnswers,
}: {
  QuestionsWithAnswers: any;
}) => {
  return (
    <div className="flex flex-col gap-4 w-full">
      {/* <VoiceRecorder /> */}
      {QuestionsWithAnswers.map((item: any) => {
        return <ShowQuastion item={item} key={item.id} />;
      })}
    </div>
  );
};




const WelcomeMessage = async () => {
  const session = await auth();
  const t = await getTranslations()
  const user = session?.user;

  return (
    <div className="flex flex-col gap-2 self-start">
      <div className="flex flex-row gap-2 md:items-end md:justify-start">
        <h1 className="text-sm md:text-2xl font-bold font-cairo">
          {t("Faq.pagetitle")}
        </h1>
        {user ? (
          <p className="text-foreground/80 font-cairo text-xs">
            {t("Faq.welcome")} {user.name}
          </p>
        ) : (
          <MustLogin />
        )}
      </div>
    </div>
  );
};

const fetchFaqData = async (locale: string) => {
  const t = await getTranslations();
  const session = await auth();
  const { answeredQuestions, pendingQuestions, rejectedQuestions } =
    await FaqCounter();

  return {
    t,
    session,
    answered: {
      name: t("Faq.answered"),
      href: `/${locale}/faq`,
      count: answeredQuestions,
    },
    rejected: {
      name: t("Faq.rejected"),
      href: `/${locale}/faq/rejected`,
      count: rejectedQuestions,
    },
    pending: {
      name: t("Faq.pending"),
      href: `/${locale}/faq/notanswered`,
      count: pendingQuestions,
    },
  };
};

const NoMoreQuestions = ({ title }: { title: string }) => (
  <div className="flex items-center justify-center  text-xl font-cairo font-bold w-full h-32 bg-yellowColor rounded-lg text-blueColor  flex-col gap-4">
    {title}
    <Loader className="text-4xl animate-spin" size={50} />
  </div>
);
