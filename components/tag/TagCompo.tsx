"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import LoaderComponent from "@/components/Loader";

interface TagCount {
  tag: string;
  count: number;
}

// New TagItem component for better separation of concerns
const TagItem: React.FC<{
  tag: TagCount;
  isSelected: boolean;
  onSelect: (value: string) => void;
}> = ({ tag, isSelected, onSelect }) => (
  <CommandItem key={tag.tag} value={tag.tag} onSelect={onSelect}>
    <div className="flex flex-row items-center gap-2">
      <p>{tag.tag}</p>
      <p className="text-sm text-foreground/50">({tag.count})</p>
    </div>
    <Check
      className={cn("ml-auto", isSelected ? "opacity-100" : "opacity-0")}
    />
  </CommandItem>
);

export default function TagCombobox({
  tags,
  totalCount,
  tagValue,
  setTagValue,
}: {
  tags: TagCount[];
  totalCount: number;
  tagValue: string;
  setTagValue: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [open, setOpen] = React.useState(false);

  if (tags.length === 0) {
    return <LoaderComponent />;
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full   justify-between"
        >
          {tagValue
            ? `${tags.find((tag) => tag.tag === tagValue)?.tag} (${tags.find((tag) => tag.tag === tagValue)?.count})`
            : "Select tag..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search tag..." className="h-9" />
          <CommandList>
            <CommandEmpty>No tag found.</CommandEmpty>
            <CommandGroup>
              {tags.map((tag) => (
                <TagItem
                  tag={tag}
                  key={tag.tag}
                  isSelected={tagValue === tag.tag}
                  onSelect={(currentValue) => {
                    setTagValue(currentValue === tagValue ? "" : currentValue);
                    setOpen(false);
                  }}
                />
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
