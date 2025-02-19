"use client";

import { validateRequest } from "@/auth";
import { createPostSchema } from "@/lib/validation";
import { isRedirectError } from "next/dist/client/components/redirect-error";

export async function submitPost(input: string): Promise<{ error: string; success?: boolean }> {
    try {
        const { user } = await validateRequest();

        console.log("user: ", user);
        
        if (!user) throw new Error("Unauthorized");

        const { content } = createPostSchema.parse({ content: input });

        const urlCreatePost = `${process.env.NEXT_PUBLIC_API_URL}/api/Post/create-post/${user.id}`;

        const token = localStorage.getItem("access_token");
        console.log("token: ", token);

        const res = await fetch(urlCreatePost, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({ content }),
        });

        if (res.ok) {
            return { error: "", success: true };
        }

        return { error: "Something went wrong", success: false };
    } catch (error) {
        if (isRedirectError(error)) throw error;

        console.error("Error posting", error);
        return { error: "Something went wrong. Please try again", success: false };
    }
}
