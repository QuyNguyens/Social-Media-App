"use client";

import { signUpSchema, SignUpValues } from "@/lib/validation";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { redirect } from "next/navigation";

export function signUp(credentials: SignUpValues) {
    return new Promise<{ error: string }>((resolve) => {
        try {
            const { username, email, password } = signUpSchema.parse(credentials);
            const url = `${process.env.NEXT_PUBLIC_API_URL}/api/User/signup`;

            fetch(url, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ userName: username, email: email, password: password }),
            })
                .then((res) => {
                    if (res.ok) {
                        redirect("/login");
                        return;
                    }
                    resolve({ error: "Email already exists!!!" });
                })
                .catch((error) => {
                    console.error("Signup error:", error);
                    resolve({ error: "Something went wrong. Please try again" });
                });
        } catch (error) {
            if (isRedirectError(error)) throw error;
            console.error("Signup error:", error);
            resolve({ error: "Something went wrong. Please try again" });
        }
    });
}
