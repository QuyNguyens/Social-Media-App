import { Comment } from '@/lib/types'
import { useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../ui/dropdown-menu";
import DeleteCommentDialog from "./DeleteCommentDialog";
import { Button } from "../../ui/button";
import { MoreHorizontal, Trash2 } from "lucide-react";

interface CommentMoreButtonProps{
    comment: Comment;
    className?: string;
    postId: string;
}

const CommentMoreButton = ({comment, className, postId}: CommentMoreButtonProps) => {
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
      <DeleteCommentDialog
          comment={comment}
          postId={postId}
          open={showDeleteDialog}
          onClose={() => setShowDeleteDialog(false)}
      >
      </DeleteCommentDialog>
    </>
}

export default CommentMoreButton