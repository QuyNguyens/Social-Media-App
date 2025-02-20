import { Post } from "@/lib/types";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import LoadingButton from "../LoadingButton";
import { deletePost } from "./actions";
import { Button } from "../ui/button";
import { useQueryClient } from "@tanstack/react-query";

interface DeletePostDialogProps{
    post: Post;
    open: boolean;
    onClose: () => void;
}


const DeletePostDialog = ({
    post,
    open,
    onClose
} : DeletePostDialogProps) => {

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
                <DialogTitle>Delete post?</DialogTitle>
                <DialogDescription>
                    Are you sure you want to delete this post? This action cannot be undone.
                </DialogDescription>
            </DialogHeader>
            <DialogFooter>
                <Button
                    variant="destructive"
                    onClick={async () => {
                        await deletePost(post.id);
                        onClose();
                        queryClient.invalidateQueries({ queryKey: ["post-feed", "for-you"] });
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

export default DeletePostDialog