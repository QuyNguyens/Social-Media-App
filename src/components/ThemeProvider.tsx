"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ReactNode, useEffect, useState } from "react";

export function ThemeProvider({ children }: { children: ReactNode }) {

    const [downloaded, setDownloaded] = useState(false);

    useEffect(() =>{
        setDownloaded(true);
    },[])
    return (
        <>
        {downloaded && <NextThemesProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <div suppressHydrationWarning>{children}</div>
        </NextThemesProvider>}
        </>
    );
}
