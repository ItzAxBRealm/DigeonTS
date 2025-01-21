import { Link, Outlet, Route, Routes, useLocation, useParams } from "react-router-dom";
import { useUserContext } from "../../context/AuthContext";
import { Loader } from "lucide-react";
import { useGetUserById } from "../../lib/react-query/queriesAndMutations";
import { editIcon, likeIcon, postsIcon, purpleProfile } from "../../assets";
import { Button } from "../../components/ui/button";
import GridPostList from "../../components/shared/GridPostList";
import LikedPosts from "./LikedPosts";

interface StabBlockProps {
  value: string | number;
  label: string;
}

const StatBlock = ({ value, label }: StabBlockProps) => (
  <div className="flex-center gap-2">
    <p className="text-[14px] font-semibold leading-[140%] tracking-tighter lg:text-[18px] lg:font-bold text-[#836FFF]">{value}</p>
    <p className="text-[14px] font-medium leading-[140%] lg:text-[16px] text-[#c8c8c8]">{label}</p>
  </div>
);

const Profile = () => {
  const { id } = useParams();
  const { user } = useUserContext();
  const { pathname } = useLocation();

  const { data: currentUser } = useGetUserById(id || "");

  if (!currentUser)
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );

  return (
    <div className="flex flex-col items-center flex-1 gap-10 overflow-scroll py-10 px-5 md:p-14 custom-scrollbar md:pt-20 lg:pt-28 xl:pt-28">
      <div className="flex items-center md:mb-8 xl:items-start gap-8 flex-col xl:flex-row relative max-w-5xl w-full">
        <div className="flex xl:flex-row flex-col max-xl:items-center flex-1 gap-7">
          <img
            src={
              currentUser.imageUrl || purpleProfile
            }
            alt="profile"
            className="w-28 h-28 lg:h-36 lg:w-36 rounded-full"
          />
          <div className="flex flex-col flex-1 justify-between md:mt-2">
            <div className="flex flex-col w-full">
              <h1 className="text-center text-white xl:text-left text-[24px] font-bold leading-[140%] tracking-tighter md:text-[36px] md:font-semibold w-full">
                {currentUser.name}
              </h1>
              <p className="text-[14px] font-normal leading-[140%] md:text-[18px] md:font-medium text-[#c2c2c2] text-center xl:text-left">
                @{currentUser.username}
              </p>
            </div>

            <div className="flex gap-8 mt-10 items-center justify-center xl:justify-start flex-wrap z-20">
              <StatBlock value={currentUser.posts.length} label="Posts" />
              <StatBlock value={20} label="Followers" />
              <StatBlock value={20} label="Following" />
            </div>

            <p className="text-[14px] text-white font-medium leading-[140%] md:text-[16px] text-center xl:text-left mt-7 max-w-screen-sm">
              {currentUser.bio}
            </p>
          </div>

          <div className="flex justify-center gap-4">
            <div className={`${user.id !== currentUser.$id && "hidden"}`}>
              <Link
                to={`/update-profile/${currentUser.$id}`}
                className={`h-12 bg-[#313131] px-5 text-[#d5d5d5] flex-center gap-2 rounded-lg ${
                  user.id !== currentUser.$id && "hidden"
                }`}>
                <img
                  src={editIcon}
                  alt="edit"
                  width={20}
                  height={20}
                />
                <p className="flex whitespace-nowrap text-[14px] font-medium leading-[140%]">
                  Edit Profile
                </p>
              </Link>
            </div>
            <div className={`${user.id === id && "hidden"}`}>
              <Button type="button" className="bg-[#836FFF] hover:bg-[#5345af] text-[#d3d3d3] flex gap-2 px-8">
                Follow
              </Button>
            </div>
          </div>
        </div>
      </div>

      {currentUser.$id === user.id && (
        <div className="flex max-w-5xl w-full">
          <Link
            to={`/profile/${id}`}
            className={`flex justify-center items-center gap-3 py-4 w-48 text-white bg-[#131313] transition flex-1 xl:flex-initial rounded-l-lg ${
              pathname === `/profile/${id}` && "!bg-[#212121]"
            }`}>
            <img
              src={postsIcon}
              alt="posts"
              width={20}
              height={20}
            />
            Posts
          </Link>
          <Link
            to={`/profile/${id}/liked-posts`}
            className={`flex justify-center items-center gap-3 py-4 w-48 text-white bg-[#131313] transition flex-1 xl:flex-initial rounded-r-lg ${
              pathname === `/profile/${id}/liked-posts` && "!bg-[#212121]"
            }`}>
            <img
              src={likeIcon}
              alt="like"
              width={20}
              height={20}
            />
            Liked Posts
          </Link>
        </div>
      )}

      <Routes>
        <Route
          index
          element={<GridPostList posts={currentUser.posts} showUser={false} />}
        />
        {currentUser.$id === user.id && (
          <Route path="/liked-posts" element={<LikedPosts />} />
        )}
      </Routes>
      <Outlet />
    </div>
  )
}

export default Profile
