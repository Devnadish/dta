"use client";
import { Loader } from "lucide-react";

import { Button } from "../../ui/button";

import { AddFaqTags, GetAllTags } from "@/actions/tag/tagActions";
import { Label } from "@radix-ui/react-label";

import { useCallback, useEffect, useMemo } from "react";
import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogContent,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";

export default function AddTag({
  QID,
  existingTags,
}: {
  QID: string;
  existingTags: string[];
}) {
  const [tags, setTags] = useState<{ id: string; name: string }[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>(existingTags);
  const [loading, setLoading] = useState(false);

  const getTags = useCallback(async () => {
    setLoading(true);
    try {
      const fetchedTags = await GetAllTags();
      setTags(fetchedTags.map((tag) => ({ id: tag.id, name: tag.tag })));
    } catch (error) {
      console.error("Error fetching tags:", error);
    } finally {
      setLoading(false);
    }
  }, [QID]);

  useEffect(() => {
    getTags();
  }, [getTags, QID]);

  const toggleTag = useCallback((tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  }, []);

  const handleSaveTags = useCallback(async () => {
    setLoading(true);
    try {
      await AddFaqTags(QID, selectedTags);
    } catch (error) {
      console.error("Error saving tags:", error);
    } finally {
      setLoading(false);
    }
  }, [QID, selectedTags]);

  const tagElements = useMemo(
    () =>
      tags.map((tag) => (
        <div key={tag.id} className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={selectedTags.includes(tag.name)}
            onChange={() => toggleTag(tag.name)}
            className="mr-2"
            name={tag.name}
            id={tag.name}
          />
          <Label htmlFor={tag.name}>{tag.name}</Label>
        </div>
      )),
    [tags, selectedTags, toggleTag]
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add Tags</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Select Tags</DialogTitle>
          <DialogDescription>
            Select the tags you want to add to the FAQ.
          </DialogDescription>
        </DialogHeader>
        {loading ? (
          <div className="flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <div className="flex flex-row flex-wrap gap-4 items-center justify-center">
            {tagElements}
          </div>
        )}
        <DialogFooter>
          <DialogClose asChild>
            <Button onClick={handleSaveTags} disabled={loading}>
              {loading ? "Saving..." : "Save Tags"}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
