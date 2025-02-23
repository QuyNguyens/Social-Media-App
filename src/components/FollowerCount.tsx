interface FollowerCountProps{
    userId: string;
}

const FollowerCount = ({
    userId
}: FollowerCountProps) => {

  return (
    <span>
        Followers: {" "}
        <span className="font-semibold">5</span>
    </span>
  )
}

export default FollowerCount