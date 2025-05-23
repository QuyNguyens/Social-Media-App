import { Post } from "@/lib/types";
import { useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import DeletePostDialog from "./DeletePostDialog";
import { Button } from "../ui/button";
import { MoreHorizontal, Trash2 } from "lucide-react";

interface PostMoreButtonProps{
    post: Post;
    className?: string;
}

const PostMoreButton = ({
    post,
    className
} : PostMoreButtonProps) => {
    const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false);

  return<>
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button size="icon" variant="ghost" className={className}>
                <MoreHorizontal className="size-5 text-muted-foreground"/>
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
            <DropdownMenuItem
                onClick={() => setShowDeleteDialog(true)}
            >   
                <span className="flex items-center gap-3 text-destructive">
                    <Trash2 className="size-4"/>
                    Delete
                </span>
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
    <DeletePostDialog
        post={post}
        open={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
    >
    </DeletePostDialog>
  </>
}

export default PostMoreButton