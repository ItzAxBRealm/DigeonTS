import PostForm from '../../components/forms/PostForm'
import { useParams } from 'react-router-dom'
import { useGetPostById } from '../../lib/react-query/queriesAndMutations';
import { Loader } from 'lucide-react';
import { editIcon } from '../../assets';

const EditPost = () => {
  const { id } = useParams();
  const { data: post, isLoading } = useGetPostById(id);

  if(isLoading) return <Loader />
  return (
    <div className='flex flex-1 md:pt-14 lg:pt-20 xl:pt-20'>
      <div className='flex flex-col flex-1 items-center gap-10 py-10 px-5 md:px-8 lg:p-14'>
        <div className='max-w-5xl flex justify-start items-start gap-3 w-full'>
          <img src={editIcon} height={36} width={36} className="" alt="Update Post" />
          <h2 className='font-bold text-3xl max-md:font-semibold text-left w-full text-white'>Update Post</h2>
        </div>
        {isLoading ? <Loader /> : <PostForm action="Update" post={post} />}
      </div>
    </div>
  )
}

export default EditPost