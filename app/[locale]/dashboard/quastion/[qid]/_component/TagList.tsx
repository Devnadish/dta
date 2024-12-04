import { tag } from "@prisma/client";

const TagList = ({ tags }: { tags: tag[] }) => (
  <div className="flex flex-wrap gap-2">
    {tags.map(({ id, tag }) => (
      <p className="text-muted-foreground p-2 text-xs" key={id}>
        #{tag}
      </p>
    ))}
  </div>
);

export default TagList;
