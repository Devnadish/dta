import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function LoadingAddFaq() {
  return (
    <div className="container max-w-xl mx-auto p-4 space-y-6">
      {/* Policy Hints Skeleton */}
      <Skeleton className="w-32 h-6" />
      <Skeleton className="w-full h-24 rounded-lg" />

      {/* Question Input Skeleton */}
      <Card>
        <CardHeader>
          <Skeleton className="w-40 h-6" />
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="w-full h-32" />
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="w-12 h-10" />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Media Upload Section Skeleton */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <Skeleton className="w-32 h-6" />
            <Skeleton className="w-24 h-4" />
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Image Upload Area */}
          <div>
            <Skeleton className="w-full h-40 rounded-lg" />
          </div>

          {/* Voice Recording Area */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <Skeleton className="w-32 h-6" />
              <Skeleton className="w-24 h-4" />
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="w-12 h-12 rounded-full" />
              <Skeleton className="w-full h-16 rounded-lg" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Submit Button Skeleton */}
      <div className="flex justify-end">
        <Skeleton className="w-24 h-10" />
      </div>
    </div>
  );
}