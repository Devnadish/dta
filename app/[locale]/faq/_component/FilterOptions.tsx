"use client";
import React, { useState } from "react";

import TagCombobox from "@/components/tag/TagCompo";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Filter } from "lucide-react";
import { FilterOptionsProps } from "@/type/types";
import QueryMode from "./QueryMode";
import ClearButton from "./ClearButton";
import SearchQuestions from "./SearchQuestions";
import ApplayFilter from "./ApplayFilter";
import { MageFilter } from "@/components/icons/FilterIcons";
import Sorting from "./Sorting";

export default function FilterOptions({
  tags,
  totalCount,
}: {
  tags: { tag: string; count: number }[];
  totalCount: number;
}) {
  const [tagValue, setTagValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [queryMode, setQueryMode] = useState("questions");
  const [sorting, setSorting] = useState("newest");

  return (
    <Sheet>
      <SheetTrigger className=" px-4 py-2 flex items-center justify-center text-muted-foreground bg-secondary gap-4 rounded-xl w-16">
        <MageFilter />
      </SheetTrigger>
      <SheetContent
        className="w-72 flex flex-col items-center gap-4 p-4"
        side={"left"}
      >
        <SheetHeader className="w-full justify-center items-center font-cairo">
          <SheetTitle className="font-amiri text-xl">Filter Option</SheetTitle>
        </SheetHeader>

        <Content
          tags={tags}
          totalCount={totalCount}
          tagValue={tagValue}
          searchValue={searchValue}
          queryMode={queryMode}
          setTagValue={setTagValue}
          setSearchValue={setSearchValue}
          setQueryMode={setQueryMode}
          sorting={sorting}
          setSorting={setSorting}
        />
      </SheetContent>
    </Sheet>
  );
}

const Content = React.memo(
  ({
    tags,
    totalCount,
    tagValue,
    searchValue,
    queryMode,
    setTagValue,
    setSearchValue,
    setQueryMode,
    sorting,
    setSorting,
  }: FilterOptionsProps) => {
    return (
      <div className="w-full flex flex-col items-center justify-center gap-4 border-t border-border pt-4">
        <TagCombobox
          tags={tags}
          totalCount={totalCount}
          tagValue={tagValue}
          setTagValue={setTagValue}
        />
        <QueryMode queryMode={queryMode} setQueryMode={setQueryMode} />
        <SearchQuestions
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />
        <Sorting sorting={sorting} setSorting={setSorting} />
        <ClearButton
          tagValue={tagValue}
          searchValue={searchValue}
          queryMode={queryMode}
          totalCount={totalCount}
          setTagValue={setTagValue}
          setSearchValue={setSearchValue}
          setQueryMode={setQueryMode}
        />
        <ApplayFilter
          tagValue={tagValue}
          searchValue={searchValue}
          queryMode={queryMode}
          setTagValue={setTagValue}
          setSearchValue={setSearchValue}
          setQueryMode={setQueryMode}
          sorting={sorting}
          setSorting={setSorting}
        />
      </div>
    );
  }
);
