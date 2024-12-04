import { countTagsInFaq } from "@/actions/tag/tagActions";
import React from "react";
import TagCombobox from "@/components/tag/TagCompo";
import FilterOptions from "../../_component/FilterOptions";

export default async function page() {
  // await new Promise((resolve) => setTimeout(resolve, 1000));
  const { tags, totalCount } = await countTagsInFaq();
  return <FilterOptions tags={tags} totalCount={totalCount} />;
}
