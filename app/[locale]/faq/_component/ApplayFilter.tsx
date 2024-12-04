import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { SheetClose } from "@/components/ui/sheet";
import { addLoadingParam } from "@/lib/nadish";
import { ApplyFilterIcon, RemoveFilter } from "@/components/icons/FilterIcons";

const ApplayFilter = React.memo(
  ({
    tagValue,
    searchValue,
    queryMode,
    setTagValue,
    setSearchValue,
    setQueryMode,
  }: {
    tagValue: string;
    searchValue: string;
    queryMode: string;
    setTagValue: React.Dispatch<React.SetStateAction<string>>;
    setSearchValue: React.Dispatch<React.SetStateAction<string>>;
    setQueryMode: React.Dispatch<React.SetStateAction<string>>;
    // onClose: () => void;
  }) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleApplyFilter = async () => {
      setIsLoading(true);

      let query = "";

      if (searchValue) {
        query += `search=${encodeURIComponent(searchValue)}`;
      }

      if (tagValue) {
        query += `${query ? "&" : ""}tag=${encodeURIComponent(tagValue)}`;
      }

      if (queryMode) {
        query += `${query ? "&" : ""}mode=${encodeURIComponent(queryMode)}`;
      }

      if (query) {
        await router.push(`/faq/ansewrd?${query}`);
      } else {
        await router.push("/faq/ansewrd");
      }
    };

    const handleRemoveFilter = async () => {
      setTagValue("");
      setSearchValue("");
      setQueryMode("questions");
      await router.push("/faq/ansewrd");
    };

    return (
      <div className="flex  items-start justify-end gap-4 border-t border-border pt-4 w-full">
        <SheetClose asChild>
          <Button
            variant={"secondary"}
            className="w-full"
            onClick={handleApplyFilter}
            disabled={isLoading}
          >
            <ApplyFilterIcon />
          </Button>
        </SheetClose>
        <SheetClose asChild>
          <Button
            variant={"secondary"}
            onClick={handleRemoveFilter}
            disabled={isLoading}
          >
            <RemoveFilter />
          </Button>
        </SheetClose>
      </div>
    );
  }
);

export default ApplayFilter;
