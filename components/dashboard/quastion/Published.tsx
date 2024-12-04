"use client";
import { Label } from "@/components/ui/label";

import { UpdateFaqPublished } from "@/actions/faq/dashboard";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";

export default function Published({
  QID,
  publishedFlag,
}: {
  QID: string;
  publishedFlag: boolean;
}) {
  const [published, setPublished] = useState(publishedFlag);
  const handlePublished = async () => {
    await UpdateFaqPublished(QID, !published);
    setPublished(!published);
  };

  return (
    <div className="flex items-center space-x-2">
      <Switch
        id="published"
        checked={published}
        onCheckedChange={handlePublished}
      />
      <Label htmlFor="published">Published</Label>
    </div>
  );
}
