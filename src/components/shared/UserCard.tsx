import { Models } from 'appwrite'
import { Link } from 'react-router-dom'
import { purpleProfile } from '../../assets'
import { Button } from '../ui/button'

type UserCardProps = {
    user: Models.Document,
}

const UserCard = ({ user }: UserCardProps) => {
  return (
    <Link to={`/profile/${user.$id}`} className='flex justify-center items-center flex-col gap-4 bg-[#131313] border border-[#313131] rounded-[20px] px-5 py-8'>
      <img src={user.imageUrl || purpleProfile} alt="creator" className='rounded-full h-14 w-14' />

      <div className="flex justify-center items-center flex-col gap-1">
        <p className="text-[16px] font-medium leading-[140%] text-[#EEEEEE] text-center line-clamp-1">
          {user.name}
        </p>
        <p className="text-[14px] font-normal leading-[140%] text-[#c3c3c3] text-center line-clamp-1">
          @{user.username}
        </p>
      </div>

      <Button type="button" size="sm" className="bg-[#836FFF] hover:bg-[#6655d6] text-[#EEEEEE] flex gap-2 px-5">
        Follow
      </Button>
    </Link>
  )
}

export default UserCard
