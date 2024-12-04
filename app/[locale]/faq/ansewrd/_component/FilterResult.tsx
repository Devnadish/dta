"use client";
import {
  QuestionIconSetting,
  RemoveFilter,
} from "@/components/icons/FilterIcons";
import { Button } from "@/components/ui/button";

import { SearchCheck, Tag } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

type FilterResultProps = {
  tag: string;
  search: string;
  mode: string;
  queryCount: number;
  pagesCount: number;
};

const FilterResult: React.FC<FilterResultProps> = ({
  tag,
  search,
  mode,
  queryCount,
  pagesCount,
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  const pathname = usePathname();

  const handleClear = () => {
    // setIsLoading(true);
    router.push("/faq/ansewrd?");
  };

  const renderFilterItem = (icon: React.ReactNode, text: string) => (
    <div className="flex items-center gap-2">
      {icon}
      <p className="text-muted-foreground text-sm">{text}</p>
    </div>
  );

  const showClearButton = tag || search || mode;

  return (
    <div className="flex gap-2 w-full items-center justify-between">
      <div className="flex items-center gap-4 bg-secondary rounded-xl py-1 px-2">
        {!showClearButton && (
          <p className="text-muted-foreground">All Questions</p>
        )}
        {tag &&
          renderFilterItem(
            <Tag className="w-4 h-4 text-muted-foreground" />,
            tag
          )}
        {search &&
          renderFilterItem(
            <SearchCheck className="w-4 h-4 text-muted-foreground" />,
            search
          )}
        {mode &&
          renderFilterItem(
            <QuestionIconSetting className="w-4 h-4 text-muted-foreground" />,
            mode
          )}
        {showClearButton && (
          <Button variant="outline" onClick={handleClear} disabled={isLoading}>
            {isLoading ? (
              <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-gray-200"></div>
            ) : (
              <RemoveFilter />
            )}
          </Button>
        )}
      </div>
      <div className="bg-secondary rounded-xl py-1 px-2">
        <p className="text-muted-foreground text-xs">
          {queryCount} / {pagesCount}
        </p>
      </div>
    </div>
  );
};

export default FilterResult;
