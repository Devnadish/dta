"use client";
import React from "react";
import { Button } from "./ui/button";
import { CreateFakeData } from "@/actions/createFakeFaq";

function FakFaq() {
  const handleCreateFakeData = async () => {
    const data = await CreateFakeData();
  };

  return (
    <div>
      <h1>Fake Data Generator</h1>
      <Button onClick={handleCreateFakeData}>
        Generate Fake Questions and Answers
      </Button>
    </div>
  );
}

export default FakFaq;
