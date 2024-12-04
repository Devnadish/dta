import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useTranslations } from "next-intl";

const ExpandButton = ({
  isExpanded,
  onClick,
}: {
  isExpanded: boolean;
  onClick: () => void;
}) => {
  const t = useTranslations("button");

  return (
    <Button
      variant={"outline"}
      onClick={onClick}
      className="flex items-center  w-fit s  sm:justify-end  font-cairo  font-bold"
      aria-expanded={isExpanded}
      aria-label={isExpanded ? t("showLess") : t("showMore")}
    >
      {isExpanded ? t("showLess") : t("showMore")}
      <ChevronDown className="ml-2" />
    </Button>
  );
};

export default ExpandButton;
