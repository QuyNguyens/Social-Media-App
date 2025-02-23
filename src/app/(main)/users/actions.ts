import kyInstance from "@/lib/ky";
import { UserProfileInfo } from "@/lib/types";

interface UserInfoProps{
    userId: string;
    email: string;
}
export async function getUserByEmail({ userId, email }: UserInfoProps) {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/user/user-profile`;

    try {
        const userInfo = await kyInstance.get(url, {
            searchParams: new URLSearchParams({ userId, email })
        }).json<UserProfileInfo>();

        console.log('userInfo: ', userInfo);

        return { userInfo };
    } catch (error) {
        return { userInfo: null };
    }
}
