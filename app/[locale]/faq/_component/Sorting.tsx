import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";

const Sorting = ({
  setSorting,
  sorting,
}: {
  setSorting: React.Dispatch<React.SetStateAction<string>>;
  sorting: string;
}) => {
  const handleQueryMode = (value: string) => {
    setSorting(value);
  };

  return (
    <div className="w-full">
      <p className="text-sm">Sort By</p>
      <RadioGroup
        defaultValue="newest"
        value={sorting}
        onValueChange={handleQueryMode}
        className="flex items-center justify-around   w-full border p-2 rounded-md"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem
            value="newest"
            id="sr1"
            className={cn("h-4 w-4", sorting === "newest" && "bg-orangeColor")}
          />
          <Label htmlFor="sr1">Newest</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem
            value="views"
            id="sr2"
            className={cn("h-4 w-4", sorting === "views" && "bg-orangeColor")}
          />
          <Label htmlFor="sr2">Views</Label>
        </div>
      </RadioGroup>
    </div>
  );
};

export default Sorting;
