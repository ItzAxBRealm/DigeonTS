import { Loader } from "lucide-react";
import { useGetCurrentUser } from "../../lib/react-query/queriesAndMutations";
import GridPostList from "../../components/shared/GridPostList";

const LikedPosts = () => {
  const { data: currentUser } = useGetCurrentUser();

  if (!currentUser)
    return (
      <div className="flex justify-center items-center w-full h-full">
        <Loader />
      </div>
    );

  return (
    <>
      {currentUser.liked.length === 0 && (
        <p className="text-[#c4c4c4]">No liked posts</p>
      )}

      <GridPostList posts={currentUser.liked} showStats={false} />
    </>
  );
};

export default LikedPosts;