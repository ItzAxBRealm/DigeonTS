import { Loader } from "lucide-react";
import { useEffect } from "react";
import { useGetRecentPosts, useGetUsers } from "../../lib/react-query/queriesAndMutations";
import PostCard from "../../components/shared/PostCard";
import { Models } from "appwrite";
import UserCard from "../../components/shared/UserCard";

interface HomePageProps {
  title: string;
}

const Home: React.FC<HomePageProps> = ({ title }) => {
  const { data: posts, isPending: isPostLoading } = useGetRecentPosts();
  const { data: creators, isLoading: isUserLoading } = useGetUsers(10);

  title = "Home | Digeon"
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Left the Tab
        document.title = "Home- Click here!";
      } else {
        // Active
        document.title = title;
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
    
  }, [title]);

  return (
    <div className="relative w-full h-screen flex flex-1 flex-row items-center justify-center md:pt-14 lg:pt-20 xl:pt-20">
      <div className="xl:w-2/3 lg:w-2/3 md:w-full w-full h-full flex flex-col items-start text-white flex-1 gap-10 overflow-scroll py-10 px-5 md:px-8 lg:p-14 custom-scrollbar">
        <h2 className="text-3xl font-bold text-white">Home Feed</h2>
        {isPostLoading && !posts ? (
          <Loader />
        ) : (
          <ul className="flex flex-col flex-1 gap-9 w-full text-center">
            {posts?.documents.map((post: Models.Document) => (
              <PostCard post={post} key={post.caption} />
            ))}
          </ul>
        )}
      </div>
      <div className="hidden xl:flex lg:flex flex-col items-center w-1/3 h-full border-l-8 border-[#131313]">
        <h2 className="text-3xl font-bold text-white mt-3 mb-5">Top Creators</h2>
        {isUserLoading && !creators ? (
          <Loader />
        ) : (
          <ul className="grid 2xl:grid-cols-2 gap-6">
            {creators?.documents.map((creator) => (
              <li key={creator?.$id}>
                <UserCard user={creator} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default Home