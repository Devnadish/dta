import {
  CreateFakeTags,
  CreateTag,
  GetAllTags,
} from "@/actions/tag/tagActions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";

async function TagsPage() {
  const tags = await GetAllTags();
  // const fakeTags = await CreateFakeTags(10);
  return (
    <div dir="ltr" className="flex flex-col gap-2">
      <AddTagForm />
      {tags.map((tag) => {
        return (
          <div
            key={tag.id}
            className="flex flex-row gap-2 items-center justify-between"
          >
            <p>{tag.tag}</p>
            <div className="flex flex-row gap-2">
              <Button variant="secondary">Edit</Button>
              <Button variant="destructive">Delete</Button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default TagsPage;
const AddTagForm = () => {
  async function CreateNewTag(formData: FormData) {
    "use server";
    const tag = formData.get("tag");
    await CreateTag(tag as string);
  }
  return (
    <form action={CreateNewTag} className="flex flex-row gap-2">
      <Input placeholder="Add Tag" name="tag" />
      <Button type="submit">Add Tag</Button>
    </form>
  );
};
