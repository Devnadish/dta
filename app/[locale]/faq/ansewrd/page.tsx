import AnsweredQuestions from "@/components/faq/AnsweredQuestions";
import ShowQuastion from "../../../../components/faq/quastion/ShowQuastion";
import FakFaq from "@/components/FakFaq";
import { Suspense } from "react";
import FilterResult from "./_component/FilterResult";
import { GetQuestions } from "@/actions/faq/answerFilter";
import NoQuestion from "@/components/icons/FilterIcons";

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
      {/* <FakFaq /> */}

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
      {QuestionsWithAnswers.map((item: any) => {
        return <ShowQuastion item={item} key={item.id} />;
      })}
    </div>
  );
};
