"use client";

import { validateRequest } from "@/auth";
import { redirect } from "next/navigation";

export function logout() {
    return new Promise<void>((resolve, reject) => {
        validateRequest()
            .then(({ user }) => {
                if (user == null) {
                    reject(new Error("Unauthorized"));
                    return;
                }
                localStorage.removeItem("access_token");
                redirect("/login");
                resolve();
            })
            .catch((error) => {
                console.error("Logout error:", error);
                reject(error);
            });
    });
}
