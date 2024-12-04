import { sanityFetch } from "../live";
import { defineQuery } from "next-sanity";

export const getData = async (departmentType: string, locale: string) => {
  const ALL_DATA = defineQuery(
    `
   *[_type=="${locale === "ar" ? "arabicPost" : "post"}" && references(*[_type=="department" && title == $departmentType]._id)]
   `
  );

  return await fetchData(ALL_DATA, { departmentType });
};

const fetchData = async (query: any, params: any) => {
  try {
    const post = await sanityFetch({ query, params });
    return post.data || [];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getPost = async (slug : string, locale: string) => {
  const POST_BY_SLUG = defineQuery(
    `
    *[_type=="${locale === "ar" ? "arabicPost" : "post"}" && slug.current == $slug][0]
    `
  );

  return await fetchData(POST_BY_SLUG, { slug });
};
