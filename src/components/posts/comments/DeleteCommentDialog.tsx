import { Comment, PostsPage } from "@/lib/types";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../../ui/dialog";
import { removeComment } from "./actions";
import { Button } from "../../ui/button";
import { useQueryClient } from "@tanstack/react-query";

interface DeleteCommentDialogProps{
    comment: Comment;
    postId: string;
    open: boolean;
    onClose: () => void;
}


const DeleteCommentDialog = ({
    comment,
    postId,
    open,
    onClose
} : DeleteCommentDialogProps) => {

    const queryClient = useQueryClient();

    function handleOpenChange(open: boolean){
        if(!open){
            onClose();
        }
    }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Delete comment?</DialogTitle>
                <DialogDescription>
                    Are you sure you want to delete this comment? This action cannot be undone.
                </DialogDescription>
            </DialogHeader>
            <DialogFooter>
                <Button
                    variant="destructive"
                    onClick={async () => {
                        await removeComment(comment.id);
                        onClose();
                        queryClient.setQueryData(["post-feed", "for-you"], (oldData: { pages: PostsPage[] } | undefined) => {
                            if (!oldData) return undefined;
                            
                            const data = {
                                ...oldData,
                                pages: oldData.pages.map((page) => ({
                                    ...page,
                                    posts: page.posts.map(post =>
                                    post.id === postId? { ...post, comments: [...post.comments.filter(c => c.id !== comment.id)]  } : post
                                    ),
                                })),
                                };
            
                            return data;
                            });
                        queryClient.setQueryData(["post-feed", "following"], (oldData: { pages: PostsPage[] } | undefined) => {
                            if (!oldData) return undefined;
                            
                            const data = {
                                ...oldData,
                                pages: oldData.pages.map((page) => ({
                                    ...page,
                                    posts: page.posts.map(post =>
                                    post.id === postId? { ...post, comments: [...post.comments.filter(c => c.id !== comment.id)]  } : post
                                    ),
                                })),
                                };
            
                            return data;
                            });

                    }}
                >
                    Delete
                </Button>
                <Button variant="outline" onClick={onClose}>Cancel</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
  )
}

export default DeleteCommentDialog