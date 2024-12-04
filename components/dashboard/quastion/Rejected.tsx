"use client";

import { UpdateFaqRejected } from "@/actions/faq/dashboard";
import LoaderComponent from "@/components/Loader";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";

export default function Rejected({
  QID,
  rejectedFlag,
}: {
  QID: string;
  rejectedFlag: boolean;
}) {
  const [rejected, setRejected] = useState(rejectedFlag);
  const [loading, setLoading] = useState(false);

  const handleWhyRejected = async (formData: FormData) => {
    setLoading(true);
    const whyRejected = formData.get("whyRejected");
    await UpdateFaqRejected(QID, rejected, whyRejected as string);
    setLoading(false);
  };
  const WhyRejected = () => {
    return (
      <form
        action={handleWhyRejected}
        className="flex items-center space-x-2 w-full"
      >
        <Input
          type="text"
          placeholder="Why Rejected"
          name="whyRejected"
          className="w-full"
        />
        <Button size="sm" variant="outline" type="submit" disabled={loading}>
          {loading ? <LoaderComponent /> : "Submit"}
        </Button>
      </form>
    );
  };
  return (
    <div className="flex flex-col items-start space-x-2 gap-2 w-full">
      <div className="flex items-center space-x-2">
        <Switch
          id="rejected"
          checked={rejected}
          onCheckedChange={setRejected}
        />
        <Label htmlFor="rejected">Rejected</Label>
      </div>
      <div className="flex items-center space-x-2 w-full ">
        {rejected && <WhyRejected />}
      </div>
    </div>
  );
}
