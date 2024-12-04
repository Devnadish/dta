// pages/pricing.tsx
import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"; // Adjust the import path as necessary

const PricingPage = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-6">Pricing Plans</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Basic Plan */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Basic Plan</CardTitle>
            <CardDescription>$10/month</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="mb-4">
              <li>Feature 1</li>
              <li>Feature 2</li>
              <li>Feature 3</li>
            </ul>
          </CardContent>
          <CardFooter>
            <button className="bg-blue-500 text-white py-2 px-4 rounded">
              Choose Plan
            </button>
          </CardFooter>
        </Card>

        {/* Standard Plan */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Standard Plan</CardTitle>
            <CardDescription>$20/month</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="mb-4">
              <li>Feature 1</li>
              <li>Feature 2</li>
              <li>Feature 3</li>
              <li>Feature 4</li>
            </ul>
          </CardContent>
          <CardFooter>
            <button className="bg-blue-500 text-white py-2 px-4 rounded">
              Choose Plan
            </button>
          </CardFooter>
        </Card>

        {/* Premium Plan */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Premium Plan</CardTitle>
            <CardDescription>$30/month</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="mb-4">
              <li>Feature 1</li>
              <li>Feature 2</li>
              <li>Feature 3</li>
              <li>Feature 4</li>
              <li>Feature 5</li>
            </ul>
          </CardContent>
          <CardFooter>
            <button className="bg-blue-500 text-white py-2 px-4 rounded">
              Choose Plan
            </button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default PricingPage;
