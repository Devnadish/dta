export const convertToSlug = (str: string): string => {
  return str
    .replace(/\s+/g, "-")
    .replace(/[^a-zA-Z0-9-\u0600-\u06FF]/g, "")
    .toLowerCase()
    .replace(/-+$/, "");
};

export const convertSlugToNormal = (slug: string): string => {
  return slug
    .replace(/-/g, " ") // Replace hyphens with spaces
    .replace(/([a-zA-Z0-9])([A-Z])/g, "$1 $2") // Add space before capital letters (if camelCase was used)
    .replace(/([^\u0600-\u06FFa-zA-Z0-9\s])/g, "") // Remove any unwanted characters
    .trim(); // Remove leading and trailing spaces
};

export const NEWSLUG = (slug: string, lang: string): string => {
  const newSlug = lang + slug.slice(2);
  return newSlug;
};

export function dateToSting(dateString: string): string {
  // Convert the date string to a Date object
  const date = new Date(dateString);

  // Get the current date and time
  const now = new Date();

  // Calculate the time difference in milliseconds
  const diff = now.getTime() - date.getTime();

  // Convert the time difference to minutes, hours, and days
  const minutes = Math.floor(diff / 1000 / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  // Return the formatted string
  if (days > 0) {
    return `${days} day${days > 1 ? "s" : ""} ago`;
  } else if (hours > 0) {
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else if (minutes > 0) {
    return `${minutes} min${minutes > 1 ? "s" : ""} ago`;
  } else {
    return "Just now";
  }
}

// utils/updateQueryParams.ts
export const addLoadingParam = (): void => {
  const searchParams = new URLSearchParams(window.location.search);
  searchParams.set("loading", "true"); // Add or update the loading parameter
  window.history.replaceState({}, '', `${window.location.pathname}?${searchParams}`);
};