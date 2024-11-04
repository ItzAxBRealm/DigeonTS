import { Models } from "appwrite";
import { Loader } from "lucide-react";
import GridPostList from "./GridPostList";

type SearchResultsProps = {
    isSearchFetching: boolean;
    searchedPosts: Models.Document[];
}

const SearchResults = ({isSearchFetching, searchedPosts}: SearchResultsProps) => {
  if(isSearchFetching) return <Loader />

  if(searchedPosts.length > 0) 
      return (
      <GridPostList posts={searchedPosts} />
      )
  return (
    <p className="text-[#a7a7a7] mt-10 text-center w-full">
      No results found
    </p>
  )
}

export default SearchResults;