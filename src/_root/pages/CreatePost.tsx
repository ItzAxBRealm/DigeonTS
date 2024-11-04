import { addPost } from '../../assets'
import PostForm from '../../components/forms/PostForm'

const CreatePost = () => {
  return (
    <div className='flex flex-1 md:pt-14 lg:pt-20 xl:pt-20'>
      <div className='flex flex-col flex-1 items-center gap-10 py-10 px-5 md:px-8 lg:p-14'>
        <div className='max-w-5xl flex justify-start items-start gap-3 w-full'>
          <img src={addPost} height={36} width={36} className="" alt="Add Post" />
          <h2 className='font-bold text-3xl max-md:font-semibold text-left w-full text-white'>Create Post</h2>
        </div>
        <PostForm action='Create' />
      </div>
    </div>
  )
}

export default CreatePost