import { faq } from "@prisma/client";

export interface Answer {
  id: string;
  content: string;
}

export interface Tag {
  id: string;
  tag: string;
  faqId: string;
}

export interface FaqItem extends faq {
  answers?: Answer[] | undefined;
  tagged?: Tag[] | undefined;
}

export interface Tag {
  id: string;
  tag: string;
}

export interface FilterOptionsProps {
  tags: {
    tag: string;
    count: number;
  }[];
  totalCount: number;
  tagValue: string;
  searchValue: string;
  queryMode: string;
  sorting: string;

  setTagValue: React.Dispatch<React.SetStateAction<string>>;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  setQueryMode: React.Dispatch<React.SetStateAction<string>>;
  setSorting: React.Dispatch<React.SetStateAction<string>>;
}
