import { Models } from "appwrite"
import { likedIcon, likeIcon, savedIcon, saveIcon } from "../../assets";
import { useDeleteSavedPost, useGetCurrentUser, useLikePost, useSavePost } from "../../lib/react-query/queriesAndMutations";
import React, { useEffect, useState } from "react";
import { checkIsLiked } from "../../lib/utils";
import { Loader } from "lucide-react";

type PostStatsProps = {
    post?: Models.Document;
    userId: string;
}

const PostStats = ({ post, userId }: PostStatsProps) => {

    const likesList = post?.likes.map((user: Models.Document) => user.$id)

    const [likes, setLikes] = useState<string[]>(likesList);
    const [isSaved, setIsSaved] = useState(false);

    const { mutate: likePost } = useLikePost()
    const { mutate: savePost, isPending: isSavingPost } = useSavePost()
    const { mutate: deleteSavedPost, isPending: isDeletingSaved } = useDeleteSavedPost()

    const { data: currentUser } = useGetCurrentUser();

    const savedPostRecord = currentUser?.save.find((record: Models.Document) => record.post.$id === post?.$id);

    const handleLikePost = (e: React.MouseEvent) => {
        e.stopPropagation();

        let newLikes = [...likes];

        const hasLiked = newLikes.includes(userId)

        if(hasLiked){
            newLikes = newLikes.filter((id) => id !== userId);
        } else{
            newLikes.push(userId);
        }

        setLikes(newLikes)
        likePost({ postId: post?.$id || '', likesArray: newLikes })
    }

    const handleSavePost = ( e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
        e.stopPropagation();

        if(savedPostRecord){
            setIsSaved(false);
            return deleteSavedPost(savedPostRecord.$id);
        } 

        savePost({ postId: post?.$id || '', userId });
        setIsSaved(true);
    }

    useEffect(() => {
        setIsSaved(!!savedPostRecord)
    }, [currentUser])

  return (
    <div className="flex justify-between items-center z-20">
      <div className="flex gap-2 mr-5">
        <img 
        src={checkIsLiked(likes, userId) ? likedIcon : likeIcon} 
        height={22} 
        width={22} 
        alt="like"
        onClick={handleLikePost}
        className="cursor-pointer"
        />
        <p className=" text-[14px] font-medium leading-[140%] lg:text-[16px] text-white">{likes.length}</p>
      </div>

      <div className="flex gap-2">
        {isSavingPost || isDeletingSaved ? <Loader /> :  <img 
        src={isSaved ? savedIcon : saveIcon} 
        height={22} 
        width={22} 
        alt="like"
        onClick={handleSavePost}
        className="cursor-pointer"
        /> }
      </div>
    </div>
  )
}

export default PostStats
