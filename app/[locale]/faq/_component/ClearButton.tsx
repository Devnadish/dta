import { Button } from "@/components/ui/button";

import React from "react";
import { SheetFooter } from "@/components/ui/sheet";

import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
interface ClearFilterProps {
  title: String;
  titleInfo: String;
  fn: React.Dispatch<React.SetStateAction<string>>; // Simplified function type
}
const ClearButton = React.memo(
  ({
    tagValue,
    searchValue,
    queryMode,
    totalCount,
    setTagValue,
    setSearchValue,
    setQueryMode,
  }: {
    tagValue: String;
    searchValue: String;
    queryMode: String;
    setTagValue: React.Dispatch<React.SetStateAction<string>>;
    setSearchValue: React.Dispatch<React.SetStateAction<string>>;
    setQueryMode: React.Dispatch<React.SetStateAction<string>>;

    totalCount: number;
  }) => {
    const router = useRouter();
    const handleClear = () => {
      router.push("/faq/answer");
    };
    return (
      <SheetFooter className="w-full justify-center items-center flex  flex-col">
        <div className="flex flex-col items-center justify-center gap-4  pt-4 w-full">
          {tagValue && (
            <ClearFilter
              title="Tag"
              titleInfo={tagValue}
              fn={() => setTagValue("")}
            />
          )}
          {searchValue && (
            <ClearFilter
              title="Search"
              titleInfo={searchValue}
              fn={() => setSearchValue("")}
            />
          )}
        </div>
      </SheetFooter>
    );
  }
);
const ClearFilter = ({ title, titleInfo, fn }: ClearFilterProps) => {
  return (
    <div className="relative flex items-center justify-between gap-4 w-full p-2 rounded-md border">
      <div className="flex items-center gap-2 w-full">
        <Button
          type="button"
          variant="secondary"
          className="border border-border rounded hover:bg-orangeColor w-6 h-6 p-0"
          onClick={() => fn("")}
        >
          X
        </Button>
        <div className="text-sm text-foreground/80 w-full truncate">
          {titleInfo}
        </div>
      </div>
      <Label className="absolute -top-2 left-0  text-muted-foreground ">
        {title}
      </Label>
    </div>
  );
};
export default ClearButton;
