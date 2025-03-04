import { Button } from '@/components/ui/button'
import { UserProfileInfo } from '@/lib/types'
import { useState } from 'react'
import EditProfileDialog from './EditProfileDialog'

type EditProfileButtonProps = {
    user: UserProfileInfo;
    setUserInfo: (user: UserProfileInfo | null) => void;
}

const EditProfileButton = ({user, setUserInfo}: EditProfileButtonProps) => {
    const [showDialog, setShowDialog] = useState(false);

  return (
    <>
        <Button onClick={() => setShowDialog(true)}>Edit Profile</Button>
        <EditProfileDialog user={user} open={showDialog} onOpenChange={setShowDialog} setUserInfo={setUserInfo}/>
    </>
  )
}

export default EditProfileButton