import { Link, useNavigate, useParams } from "react-router-dom";
import { useDeletePost, useGetPostById, useGetUserPosts } from "../../lib/react-query/queriesAndMutations"
import { Loader } from "lucide-react";
import { timeAgo } from "../../lib/utils";
import { deleteIcon, purpleEdit } from "../../assets";
import { useUserContext } from "../../context/AuthContext";
import { Button } from "../../components/ui/button";
import PostStats from "../../components/shared/PostStats";
import GridPostList from "../../components/shared/GridPostList";

const PostDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useUserContext();

  const { data: post, isPending } = useGetPostById(id);
  const { data: userPosts, isLoading: isUserPostLoading } = useGetUserPosts(
    post?.creator.$id
  );
  const { mutate: deletePost } = useDeletePost();

  const relatedPosts = userPosts?.documents.filter(
    (userPost) => userPost.$id !== id
  );

  const handleDeletePost = () => {
    deletePost({ postId: id, imageId: post?.imageId });
    navigate(-1);
  };

  return (
    <div className="flex flex-col flex-1 gap-10 overflow-scroll py-10 px-5 md:p-14 custom-scrollbar items-center md:pt-20 lg:pt-28 xl:pt-28">
      {isPending ? <Loader /> : (
        <div className="bg-[#131313] w-full max-w-5xl rounded-[30px] flex-col flex xl:flex-row border border-[#313131] xl:rounded-l-[24px]">
          <img src={post?.imageUrl} alt="post" className="h-80 lg:h-[480px] xl:w-[48%] rounded-t-[30px] xl:rounded-l-[24px] xl:rounded-tr-none object-cover p-5 bg-[#111111]" />
          <div className="bg-[#131313] flex flex-col gap-5 lg:gap-7 flex-1 items-start p-8 rounded-[30px]">
            <div className="flex justify-between items-center w-full">
              <Link to={`/profile/${post?.creator.$id}`} className="flex items-center gap-3">
                <img src={post?.creator?.imageUrl || '/assets/icons/profile-placeholder.svg'} alt="creator" className="rounded-full w-8 h-8 lg:w-12 lg:h-12" />

                <div className="flex flex-col items-start text-left">
                  <p className="text-[16px] font-medium leading-[140%] lg:text-[18px] lg:font-bold text-[#EEEEEE]">
                    {post?.creator.name}
                  </p>
                  <div className="flex justify-center items-center gap-2 text-gray-400">
                    <p className="text-[12px] font-semibold leading-[140%] lg:text-[14px] lg:font-normal">
                      {timeAgo(post?.$createdAt)}
                    </p>
                    -
                    <p className="text-[12px] font-semibold leading-[140%] lg:text-[14px] lg:font-normal">
                      {post?.location}
                    </p>
                  </div>
                </div>
              </Link>

              <div className="flex justify-center items-center gap-4">
                <Link to={`/update-post/${post?.$id}`} className={`${user.id !== post?.creator.$id && 'hidden'}`}>
                  <img src={purpleEdit} alt="Edit" width={24} height={24} />
                </Link>

                <Button onClick={handleDeletePost} variant="ghost" className={`ghost_details-delete_btn ${user.id !== post?.creator.$id && 'hidden'}`} >
                  <img src={deleteIcon} alt="delete" width={24} height={24} />
                </Button>
              </div>
            </div>
            <hr className="border w-full border-[#313131]" />
            <div className="flex flex-col flex-1 w-full text-[14px] font-medium leading-[140%] lg:font-normal lg:text-[16px] py-5">
              <p className="text-white">{post?.caption}</p>
              <ul className="flex gap-1 mt-2">
                {post?.tags.map((tag: string) => (
                  <li key={tag} className="text-gray-400">
                    #{tag}
                  </li>
                ))}
              </ul>
            </div>
            <div className="w-full">
                <PostStats post={post} userId={user.id} />
            </div>
          </div>
        </div>
      )}

        <div className="w-full max-w-5xl">
          <hr className="border w-full border-[#313131]/80" />

          <h3 className="text-[18px] font-bold leading-[140%] md:text-[24px] md:tracking-tighter w-full my-10">
            More Related Posts
          </h3>
          {isUserPostLoading || !relatedPosts ? (
            <Loader />
          ) : (
            <GridPostList posts={relatedPosts} />
          )}
        </div>

    </div>
  )
}

export default PostDetails;