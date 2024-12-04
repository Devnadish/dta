import { Input } from "@/components/ui/input";

import { Search } from "lucide-react";
import { useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const SearchQuestions = ({
  searchValue,
  setSearchValue,
}: {
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const searchParams = useSearchParams();

  const handleSearch = () => {
    const sp = new URLSearchParams(searchParams);
    const tagname = searchParams.get("tagname") || "all";
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const tagParams = searchParams?.get("tagname") || "all";
    const srParams = searchParams?.get("search") || "";
    setSearchValue((pre) => e.target.value);
  };

  return (
    <form
      action={handleSearch}
      className="flex items-center flex-col  w-full gap-6"
    >
      <Textarea
        placeholder="Search questions"
        value={searchValue}
        onChange={handleChange}
        className="w-full border-orangeColor/50 resize-none"
      />
    </form>
  );
};
export default SearchQuestions;
