"use client";
import { Label } from "@/components/ui/label";

import { Switch } from "@/components/ui/switch";

import { UpdateFaqUnRejected } from "@/actions/faq/dashboard";

import { useState } from "react";

export default function UnRejected({
  QID,
  rejectedFlag,
}: {
  QID: string;
  rejectedFlag: boolean;
}) {
  const [rejected, setRejected] = useState(rejectedFlag);

  const handleUnRejected = async () => {
    await UpdateFaqUnRejected(QID);
    setRejected(false);
  };

  return (
    <div className="flex flex-col items-start space-x-2 gap-2 w-full">
      <div className="flex items-center space-x-2">
        <Switch
          id="unRejected"
          checked={rejected}
          onCheckedChange={handleUnRejected}
        />
        <Label htmlFor="unRejected">Un Rejected</Label>
      </div>
    </div>
  );
}
