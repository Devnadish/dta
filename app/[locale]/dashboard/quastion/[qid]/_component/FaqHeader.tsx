import { CardHeader, CardTitle } from "@/components/ui/card";
import TagList from "./TagList";
import { FaqItem } from "@/type/types";
import FaqHeaderInformation from "@/components/faq/FaqHeaderInformation";

const FaqHeader = ({ item }: { item: FaqItem }) => (
  <CardHeader>
    <FaqHeaderInformation item={item} />
    <div className="flex items-center justify-between w-full flex-col ">
      {item && item.rejected && (
        <>
          <p className="text-xs bg-greenColor/50 w-fit rounded-md p-2 self-start">
            Rejected Because
          </p>
          <p className="text-xs bg-destructive/50 w-full rounded-md p-2">
            {item.rejectedReason ? (
              item.rejectedReason
            ) : (
              <span className="bg-gray-900 p-1 rounded">No reason</span>
            )}
          </p>
        </>
      )}
    </div>
    <CardTitle>{item ? item.question : "Loading..."}</CardTitle>
    {item?.tagged && <TagList tags={item.tagged} />}
  </CardHeader>
);

export default FaqHeader;
