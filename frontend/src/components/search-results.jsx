import { useSearchPrompts } from "@/hooks/useSearchPrompts";
import React from "react";
import { Loader } from "./ui/shadcn-io/ai/loader";
import HoverCard from "./hoverCard";

const SearchResults = ({ tag, reset }) => {
  const { data, isLoading, isFetched } = useSearchPrompts(tag, reset);

  if (isLoading) {
    return (
      <div className="h-fit w-full flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="h-fit max-h-full w-full max-w-4xl mx-auto relative rounded-lg p-1 grid xl:grid-cols-3 sm:grid-cols-1 gap-3 overflow-y-auto ">
      {Array.isArray(data) &&
        data.map((i) => {
          return ( <>
            <h1>
            {`here are the Promtps for ${tag}`}
            </h1>
            <HoverCard i={i} />
            </>
          );
        })}
      {Array.isArray(data) && data.length == 0 && (
        <h1>There are no Prompts for {tag} , Try some different tags</h1>
      )}
    </div>
  );
};

export default SearchResults;
