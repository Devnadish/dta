import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";

const QueryMode = ({
  setQueryMode,
  queryMode,
}: {
  setQueryMode: React.Dispatch<React.SetStateAction<string>>;
  queryMode: string;
}) => {
  const handleQueryMode = (value: string) => {
    setQueryMode(value);
  };

  return (
    <RadioGroup
      defaultValue="questions"
      value={queryMode}
      onValueChange={handleQueryMode}
      className="flex items-center justify-around   w-full"
    >
      <div className="flex items-center space-x-2">
        <RadioGroupItem
          value="questions"
          id="r1"
          className={cn(
            "h-4 w-4",
            queryMode === "questions" && "bg-orangeColor"
          )}
        />
        <Label htmlFor="r1">Questions</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem
          value="answers"
          id="r2"
          className={cn("h-4 w-4", queryMode === "answers" && "bg-orangeColor")}
        />
        <Label htmlFor="r2">Answers</Label>
      </div>
    </RadioGroup>
  );
};

export default QueryMode;
