import { Models } from "appwrite"
import { Link } from "react-router-dom";
import { timeAgo } from "../../lib/utils";
import { purpleEdit, purpleProfile } from "../../assets";
import { useUserContext } from "../../context/AuthContext";
import PostStats from "./PostStats";

type PostCardProps = {
    post: Models.Document;
}

const PostCard = ({ post }: PostCardProps) => {
  const { user } = useUserContext();

  if(!post.creator) return;

  return (
    <div className="bg-[#131313] rounded-3xl border border-[#313131] p-5 lg:p-7 w-full max-w-screen-sm">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Link to={`/profile/${post.creator.$id}`}>
              <img src={post.creator?.imageUrl || '/assets/icons/profile-placeholder.svg'} alt="creator" className="rounded-full w-12 lg:h-12" />
          </Link>

          <div className="flex flex-col items-start text-left">
            <p className="text-[16px] font-medium leading-[140%] lg:text-[18px] lg:font-bold text-[#EEEEEE]">
              {post.creator.name}
            </p>
            <div className="flex justify-center items-center gap-2 text-gray-400">
              <p className="text-[12px] font-semibold leading-[140%] lg:text-[14px] lg:font-normal">
                {timeAgo(post.$createdAt)}
              </p>
              -
              <p className="text-[12px] font-semibold leading-[140%] lg:text-[14px] lg:font-normal">
                {post.location}
              </p>
            </div>
          </div>
        </div>
        
        <Link to={`/update-post/${post.$id}`} className={`${user.id !== post.creator.$id && "hidden"}`}>
          <img src={purpleEdit} alt="edit" width={20} height={20} />
        </Link>
      </div>

      <Link to={`/posts/${post.$id}`}>
        <div className="text-[14px] font-medium leading-[140%] lg:text-[16px] py-5 text-left">
          <p>{post.caption}</p>
          <ul className="flex gap-1 mt-2">
            {post.tags.map((tag: string) => (
              <li key={tag} className="text-gray-400">
                #{tag}
              </li>
            ))}
          </ul>
        </div>

        <img src={post.imageUrl || purpleProfile} className="h-64 xs:h-[400px] lg:h-[450px] w-full rounded-[24px] object-cover mb-5" alt="post image" />
      </Link>

      <PostStats post={post} userId={user.id} />
    </div>
  )
}

export default PostCard