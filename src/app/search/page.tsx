import React from "react";
import { redirect } from "next/navigation";

import paths from "@/paths";
import { fetchPostsBySearchTerm } from "@/db/queries/posts";
import PostList from "@/components/posts/PostList";

interface SearchPageProps {
  searchParams: {
    term: string;
  };
}

const SearchPage = ({ searchParams }: SearchPageProps) => {
  const { term } = searchParams;

  if (!term) redirect(paths.home());

  return (
    <div>
      <PostList fetchData={() => fetchPostsBySearchTerm(term)} />
    </div>
  );
};

export default SearchPage;
