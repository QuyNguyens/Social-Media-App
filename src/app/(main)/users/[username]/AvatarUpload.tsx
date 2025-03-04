import UserAvatar from "@/components/UserAvatar";
import { Camera } from "lucide-react";
import { useSession } from "../../SessionProvider";

interface AvatarUploadProps{
  avatar: string;
  setAvatar: (url: string) => void;
}

const AvatarUpload = ({avatar, setAvatar}: AvatarUploadProps) => {
      const { user, setUser } = useSession();
  
  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) =>{
    const file = event.target.files?.[0];

    if(file != null){
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset","Ecommerce_Upload");
        data.append("cloud_name", "dd77pesl6");

        const res = await fetch(`https://api.cloudinary.com/v1_1/dd77pesl6/image/upload`,{
            method: "POST",
            body: data
        })

        const result = await res.json();
        setAvatar(result.url);
        setUser({ ...user, avatar: result.url });
    }
  } 

  return (
    <div className="relative w-fit">
      <UserAvatar avatarUrl={avatar} size={150} />

      <label
        htmlFor="avatarUpload"
        className="absolute inset-0 flex items-center justify-center 
                   "
      >
        <Camera className="text-white bg-black/30 hover:bg-black/60 rounded-full 
                   cursor-pointer transition duration-300 p-3 size-auto" />
      </label>

      <input id="avatarUpload" type="file" className="hidden" onChange={handleUpload} />
    </div>
  )
}

export default AvatarUpload