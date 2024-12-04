import { faq } from "@prisma/client";
import UnRejected from "@/components/dashboard/quastion/UnRejected";

import Rejected from "@/components/dashboard/quastion/Rejected";

interface Answer {
  id: string;
  content: string;
}

interface Tag {
  id: string;
  tag: string;
  faqId: string;
}

interface FaqItem extends faq {
  answers?: Answer[];
  tagged?: Tag[];
}
const RejectionStatus = ({ item }: { item: FaqItem | null }) => {
  if (!item) return null; // Handle case where item is null

  return !item.rejected ? (
    <Rejected QID={item.id ?? ""} rejectedFlag={item.rejected ?? false} />
  ) : (
    <UnRejected QID={item.id ?? ""} rejectedFlag={item.rejected ?? false} />
  );
};

export default RejectionStatus;
