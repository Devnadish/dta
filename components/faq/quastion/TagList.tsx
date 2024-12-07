import { Badge } from "@/components/ui/badge";

const TagList = ({ tags }: { tags?: string[] }) => {
  if (!tags) return null;

  return (
    <div className="flex flex-row gap-2 w-full items-center">
      {tags.map((tag, index) => (
        <div key={index} className="flex flex-row gap-2 items-center">
          <Badge variant={"secondary"}>{tag} </Badge>
        </div>
      ))}
    </div>
  );
};
export default TagList;
