import { useEffect, useState } from "react"
import { filterIcon, searchIcon } from "../../assets"
import { Input } from "../../components/ui/input"
import GridPostList from "../../components/shared/GridPostList";
import { useGetPosts, useSearchPosts } from "../../lib/react-query/queriesAndMutations";
import useDebounce from "../../hooks/useDebounce";
import { Loader } from "lucide-react";
import { useInView } from 'react-intersection-observer';

export type SearchResultProps = {
  isSearchFetching: boolean;
  searchedPosts: any;
};

const SearchResults = ({ isSearchFetching, searchedPosts }: SearchResultProps) => {
  if (isSearchFetching) {
    return <Loader />;
  } else if (searchedPosts && searchedPosts.documents.length > 0) {
    return <GridPostList posts={searchedPosts.documents} />;
  } else {
    return (
      <p className="text-light-4 mt-10 text-center w-full">No results found</p>
    );
  }
};


const Explore = () => {
  const { ref, inView } = useInView();
  const { data: posts, fetchNextPage, hasNextPage } = useGetPosts();

  const [searchValue, setSearchValue] = useState('');

  const debouncedValue = useDebounce(searchValue, 500);
  const { data: searchedPosts, isFetching: isSearchFetching } = useSearchPosts(debouncedValue);

  useEffect(() => {
    if(inView && searchValue) fetchNextPage();
  }, [inView, searchValue, fetchNextPage])

  if(!posts){
    return(
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    )
  }

  const shouldShowSearchResults = searchValue !== '';
  const shouldShowPosts = !shouldShowSearchResults && posts.pages.every((item) => item?.documents?.length === 0);

  return (
    <div className="flex flex-col flex-1 items-center overflow-scroll py-10 px-5 md:p-14 custom-scrollbar">
      <div className="max-w-5xl flex flex-col items-center w-full gap-6 md:gap-9">
        <h2 className="text-[24px] font-bold leading-[140%] tracking-tighter md:text-[30px]">Search Posts</h2>
        <div className="flex gap-1 px-4 w-full rounded-lg bg-[#313131]">
          <img src={searchIcon} width={24} height={24} alt="search" />
          <Input
            type="text"
            placeholder="Search"
            className="h-12 bg-[#313131] border-none placeholder:text-[#b1b1b1] focus-visible:ring-0 focus-visible:ring-offset-0 ring-offset-0 outline-none"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
      </div>

      <div className="flex justify-between items-center w-full max-w-5xl mt-16 mb-7">
        <h3 className="text-[18px] font-bold leading-[140%] md:text-[24px] md:tracking-tighter text-white">Popular Today</h3>

        <div className="flex justify-center items-center gap-3 bg-[#c5adad] rounded-xl px-4 py-2 cursor-pointer text-white">
          <p className="text-[14px] font-medium leading-[140%] md:text-[16px] text-[#EEEEEE]">All</p>
          <p>
            <img src={filterIcon} alt="filter" width={20} height={20} />
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-9 w-full max-w-5xl">
        {shouldShowSearchResults ? (
          <SearchResults 
            isSearchFetching = {isSearchFetching}
            searchedPosts = {searchedPosts}
          />
        ) : shouldShowPosts ? (
          <p className="text-[#c3c3c3] m-10 text-center w-full">End of posts</p>
        ) : posts?.pages?.map((item, index) => (
          <GridPostList key={`page-${index}`} posts={item?.documents ?? []} />
        ))
        }
      </div>

      {hasNextPage && !searchValue && (
        <div ref={ref} className="mt-10">
          <Loader />
        </div>
      )}
    </div>
  )
}

export default Explore
