"use client";
// import { Post } from "@/sanity.types";
import SectionTitle from "./SectionTitle";
import React, { useState, memo } from "react"; // Import memo for performance optimization
import PostList from "./PostList";
import ExpandButton from "@/components/post/ExpandButton";
import { SectionViewProps } from "@/constant/type";

// Memoize the component to prevent unnecessary re-renders
const SectionView = memo(({ posts, title, icon }: SectionViewProps) => {
  const [isExpanded, setIsExpanded] = useState(false); // State to manage expansion
  const displayedPosts = isExpanded ? posts : posts.slice(0, 3); // Show 3 posts by default

  const toggleExpand = () => setIsExpanded((prev) => !prev); // Toggle function for clarity

  return (
    <div className="flex flex-col w-full">
      <div className="flex  flex-row   items-center  justify-between   sm:w-full bg-secondary p-2 rounded-lg shadow-md">
        <SectionTitle title={title} icon={icon} />
        <ExpandButton isExpanded={isExpanded} onClick={toggleExpand} />
      </div>
      <PostList posts={displayedPosts} isExpanded={isExpanded} />{" "}
      {/* Pass displayedPosts instead of all posts */}
    </div>
  );
});

export default SectionView;
