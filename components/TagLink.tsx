import Link from "next/link";

function TagLink({
  tag,
  count,
  name,
}: {
  tag: string;
  count: number;
  name: string;
}) {
  return (
    <Link
      href={{ query: { tagname: tag.toLowerCase() } }}
      className="text-white  font-cairo flex items-center justify-center gap-1    w-16 text-xs"
    >
      <span>{name}</span>
      <span className="text-primary text-xs">{count}</span>
    </Link>
  );
}

export default TagLink;
