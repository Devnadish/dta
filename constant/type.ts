import { Post } from "@/sanity.types";

export interface propType {
  params: Promise<{ slug: string; category: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}
export interface SkeletonProps {
  className: string;
}
export interface ErrorBoundaryProps {
  error: Error & { digest?: string };
  reset: () => void;
}
export interface TaskCounterProps {
  prefix: string;
}
export interface SectionTitleProps {
  title: string;
  icon?: React.ReactNode;
}
export interface SectionViewProps {
  posts: Post[];
  title: string;
  icon: React.ReactNode;
}

