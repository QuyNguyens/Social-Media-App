export interface Post{
    id: string;
    content: string;
    createAt: Date;
    userId: string;
    userName?: string;
    avatar?: string;
    email?: string;
    isFollowed: boolean;
    urlImages: string[];
    likeCount: number;
    isLikeByUser: boolean;
    isBookMark: boolean;
    comments: Comment[];
}

export interface User{
    id: string,
    userName: string,
    email: string,
    phone?: string,
    avatar?: string,
    createAt?: Date
}

export interface PostsPage {
    posts: Post[];
    nextCursor: string | null;
}

export interface FollowerInfo{
    followers: number;
    isFollowedByUser: boolean;
}

export interface Followers{
    id : string;
    email : string;
    avatar : string;
    userName : string ;
    isFollowed : boolean;
    createAt : Date;
}

export interface UserProfileInfo{
    user: Followers;
    postCount: number;
    followerCount: number;
}

export interface Comment{
    id: string;
    userId: string;
    avatar: string;
    email: string;
    createAt: Date;
    content: string;
}