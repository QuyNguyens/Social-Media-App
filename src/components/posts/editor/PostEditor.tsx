"use client"

import {EditorContent, useEditor} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { submitPost } from "./actions";
import UserAvatar from "@/components/UserAvatar";
import { useSession } from "@/app/(main)/SessionProvider";
import { Button } from "@/components/ui/button";
import { useQueryClient } from "@tanstack/react-query";

import "./style.css";
import UploadImages from "./UploadImages";
import { useState } from "react";

export default function PostEditor(){

    const [fileUrls, setFileUrls] = useState<string[]>([]);
    const {user} = useSession();
    const queryClient = useQueryClient();
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                bold: false,
                italic: false
            }),
            Placeholder.configure({
                placeholder: "What's crack-a-lackin'?"
            })
        ]
    });

    const input = editor?.getText({
        blockSeparator: "\n"
    }) || "";

    async function onSubmit(){
        await submitPost(input, fileUrls);
        editor?.commands.clearContent();
        queryClient.invalidateQueries({ queryKey: ["post-feed", "for-you"] });
        queryClient.invalidateQueries({ queryKey: ["trend-topics", user.id] });
        setFileUrls([]);
    }

    return (
        <div className="flex flex-col gap-5 rounded-2xl bg-card p-5 shadow-sm">
             <div className="flex gap-5">
                <UserAvatar avatarUrl={user.avatar} className="hidden sm:inline"/>
                <EditorContent
                    editor={editor}
                    className="w-full max-h-[20rem] overflow-y-auto bg-background rounded-2xl px-5 py-3" />
             </div>
             <div className="flex justify-end">
                <UploadImages fileUrls={fileUrls} setFileUrls={setFileUrls}/>
                <Button
                    onClick={onSubmit}
                    disabled={!input.trim()}
                    className="min-w-20"
                >
                    Post
                </Button>
             </div>
        </div>
    )
}