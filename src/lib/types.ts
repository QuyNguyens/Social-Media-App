export interface Post{
    id: string;
    content: string;
    createAt: Date;
    userId: string;

}

export interface User{
    id: string,
    userName: string,
    email: string,
    phone?: string,
    avatar?: string,
}

export interface PostsPage {
    posts: Post[];
    nextCursor: string | null;
}